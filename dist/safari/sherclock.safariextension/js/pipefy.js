(function() {
  var __bind = function(fn, me) {
    return function() {
      return fn.apply(me, arguments);
    };
  };

  var PipefyProfile;
  var debug = false;

  PipefyProfile = (function() {
    function PipefyProfile(config) {
      var _this;

      this.config = config;
      this.addTimer = __bind(this.addTimer, this);
      this.actionElement = null;
      this.renderTries = 0;
      this.timerListItem = null;
      this.linkPattern = /^https?:\/\/(.+).pipefy.com(\/v2)?\/pipes\/([0-9]+)#cards\/([0-9]+)$/;

      link = window.location.href;
      linkParts = link.match(this.linkPattern);
      this.isBeta = linkParts[1] === "beta";

      if (this.isBeta) {
        this.cardTitleSelector = ".card-title-editable a";
        this.actionSelector = ".card-sidebar nav ul";
      } else {
        this.cardTitleSelector = ".card-details .card-header h1.card-name";
        this.actionSelector = ".add-more-launcher ul.dropdown-menu";
      }

      _this = this;
      document.addEventListener('DOMContentLoaded', function() {
        _this.addTimer();

        _this.addTimerWhenUrlChanges();
        _this.addTimerIfAlreadyInCard();
      });

    }

    PipefyProfile.prototype.addTimer = function() {
      var _this = this;
      setTimeout(function() {
        var actionList = document.querySelector(_this.actionSelector);
        var cardTitle = document.querySelector(_this.cardTitleSelector);
        if ((actionList !== null) && (cardTitle !== null)) {
          var data = _this.getDataForTimer();
          if (_this.notEnoughInfo(data)) {
            _this.addTimer();
            return;
          }

          if (debug) console.info("trying to add button");
          var hasActions = !!document.querySelector(_this.actionSelector);

          if (!hasActions) {
            if (debug) console.info("pipefy is not ready...");
            _this.addTimer();
            return;
          }

          _this.buildTimer(data);
          _this.addTimerAgainIfElementRerendered();

          if (debug) console.info("button added!" + (_this.renderTries > 1 ? "(for the " + _this.renderTries + " time)" : ""));
        } else {
          _this.addTimer();
        }
      }, 500);
    };

    PipefyProfile.prototype.getDataForTimer = function() {
      var itemName, link, linkParts, projectName, cardTitle, _ref1;
      cardTitle = document.querySelector(this.cardTitleSelector);
      itemName = cardTitle !== null ? cardTitle.innerText.trim() : void 0;
      projectName = (_ref1 = document.querySelector(".pipe-header .pipe-title a")) !== null ? _ref1.innerText.trim() : void 0;
      link = window.location.href;
      linkParts = link.match(this.linkPattern);
      return {
        project: {
          id: linkParts !== null ? linkParts[3] : void 0,
          name: projectName
        },
        item: {
          id: linkParts !== null ? linkParts[4] : void 0,
          name: itemName
        }
      };
    };

    PipefyProfile.prototype.notEnoughInfo = function(data) {
      var _ref, _ref1;
      return !(((data !== null ? (_ref = data.project) !== null ? _ref.id : void 0 : void 0) !== null) && ((data !== null ? (_ref1 = data.item) !== null ? _ref1.id : void 0 : void 0) !== null));
    };

    PipefyProfile.prototype.buildTimer = function(data) {
      var actions, icon, timer, url, existentButtons;
      actions = document.querySelector(this.actionSelector);

      if (!actions) {
        return;
      }

      existentButtons = document.querySelectorAll(".sherclock-timer");
      [].forEach.call(existentButtons, function(button) {
        button.parentNode.removeChild(button);
      });

      this.actionElement = actions;

      this.timerListItem = document.createElement("li");
      timer = document.createElement("a");
      timer.className = "sherclock-timer button-link js-add-trello-timer";
      timer.setAttribute("id", "sherclock-timer");
      if (debug) {
        url = "http://sherclock-staging.herokuapp.com/time_entries/new";
      } else {
        url = "http://sherclock.herokuapp.com/time_entries/new";
      }
      timer.setAttribute(
        "href",
        url + "?description=" + encodeURIComponent(data.item.name) +
          "&external_link=" + encodeURIComponent(window.location.href) +
            "&external_project_id=" + encodeURIComponent(data.project.id) +
              "&external_application_id=pipefy"
      );
      timer.setAttribute("target", "_blank");
      icon = document.createElement("i");
      icon.className = "fa fa-clock-o";
      timer.appendChild(icon);
      timer.appendChild(document.createTextNode(" Add Timer"));
      this.timerListItem.appendChild(timer);

      return actions.insertBefore(this.timerListItem, actions.children[actions.children.length]);
    };

    PipefyProfile.prototype.addTimerIfAlreadyInCard = function() {
      var link = window.location.href;
      var linkParts = !!link.match(this.linkPattern);
      if(linkParts)
        this.addTimer();
    };

    PipefyProfile.prototype.addTimerAgainIfElementRerendered = function() {
      var checkOks = 0;
      var interval = 500;
      var handler = setInterval((function(_this){
        return function(){
          var actions = document.querySelector(_this.actionSelector);

          if (!actions) {
            // We are not at the card anymore!
            if (debug) console.info("Goodbye Mr. Card!");
            _this.renderTries = 0;
            clearInterval(handler);
            return;
          }

          if (actions == _this.actionElement) {
            checkOks++;
            // Check for rerendering only for ONE second
            if (checkOks < 2000 / interval) {
              if (debug) console.info("OK");
              return; // All is ok, for now
            }

            // I bet it stopped rerendering stuff
            if (debug) console.info("Cleared retries count");
            _this.renderTries = 0;
            clearInterval(handler);
            return;
          }

          // It rerendered for some reason!
          if (debug) console.info("Card rerendered!");
          clearInterval(handler);
          _this.addTimer();
        };
      })(this), interval);
    };

    PipefyProfile.prototype.addTimerWhenUrlChanges = function() {
      var ph, script,
        _this = this;
      script = document.createElement("script");
      script.innerHTML = "(" + (this.notifyOnUrlChanges.toString()) + ")()";
      ph = document.getElementsByTagName("script")[0];
      ph.parentNode.insertBefore(script, ph);
      return window.addEventListener("message", function(evt) {
        if (evt.source !== window) {
          return;
        }
        if (evt.data !== "urlChange") {
          return;
        }
        _this.addTimer();
      });
    };

    PipefyProfile.prototype.notifyOnUrlChanges = function() {
      var change, fn;
      change = function() {
        return window.postMessage("urlChange", "*");
      };
      fn = window.history.pushState;
      window.history.pushState = function() {
        fn.apply(window.history, arguments);
        return change();
      };
      return window.addEventListener("popstate", change);
    };

    return PipefyProfile;
  })();

  console.log("Sherclock extensions. Github: https://github.com/kelvinst/sherclock-extensions");

  return new PipefyProfile();
}).call(this);
