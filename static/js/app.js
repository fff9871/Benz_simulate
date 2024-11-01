var MyScroll = "";
(function (window, document, $, undefined) {
  "use strict";
  var isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Nokia|Opera Mini/i.test(
      navigator.userAgent
    )
      ? !0
      : !1;
  var Scrollbar = window.Scrollbar;
  var Init = {
    i: function (e) {
      Init.s();
      Init.methods();
    },
    s: function (e) {
      (this._window = $(window)),
        (this._document = $(document)),
        (this._body = $("body")),
        (this._html = $("html"));
    },
    methods: function (e) {
      Init.w();
      Init.BackToTop();
      Init.preloader();
      Init.header();
      Init.swiper();
      Init.slick();
      Init.categoryToggle();
      Init.filterSearch();
      Init.passwordIcon();
      Init.countdownInit(".countdown", "2025/07/01");
      Init.formValidation();
      Init.contactForm();
      Init.dropdown();
      Init.awards();
      Init.quantityHandle();
      Init.showReview();
    },

    BackToTop: function () {
      var scrollToTopBtn = document.querySelector(".scrollToTopBtn");
      var rootElement = document.documentElement;
      function handleScroll() {
        var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
        if (rootElement.scrollTop / scrollTotal > 0.05) {
          scrollToTopBtn.classList.add("showBtn");
        } else {
          scrollToTopBtn.classList.remove("showBtn");
        }
      }
      function scrollToTop() {
        rootElement.scrollTo({ top: 0, behavior: "smooth" });
      }
      scrollToTopBtn.addEventListener("click", scrollToTop);
      document.addEventListener("scroll", handleScroll);
    },

    preloader: function () {
      setTimeout(function () {
        $("#preloader").hide("slow");
      }, 2000);
    },

    awards: function (e) {
      $(".box1open").hide().first().show(); // Initially hide all except the first

      $(".box1").on("click", function () {
        var index = $(this).index(".box1");

        // Hide all .box1open elements and show the one that matches the clicked box
        $(".box1open").hide();
        $(".box1open").eq(index).fadeIn("slow");

        // Remove the 'active' class from all boxes and add it to the clicked one
        $(".box1").removeClass("active");
        $(this).addClass("active");
      });
    },

    showReview: function () {
      $(".review-btn").on("click", function () {
        $(".review-btn").removeClass("te-button");
        var id = $(this).attr("data-atr");
        $(this).addClass("te-button");

        // Hide all review blocks slowly
        $(".review-block").hide("slow");

        // Show the selected review block slowly
        $("#" + id).show("slow");
      });
    },
    teamMemberShow: function (e) {
      $(".member").on("click", function () {
        var id = $(this).attr("id");
        $(".member").removeClass("active");
        $(this).addClass("active");
        $(".member-details").hide("slow");
        $("." + id).show("slow");
      });
    },

    serviceShow: function (e) {
      $(".service_title").on("click", function () {
        var id = $(this).attr("id");
        $(".service_title").removeClass("active");
        $(this).addClass("active");
        $(".service-detail").hide("slow");
        $("." + id).show("slow");
      });
    },

    w: function (e) {
      if (isMobile) {
        $("body").addClass("is-mobile");
      }
    },

    header: function () {
      function dynamicCurrentMenuClass(selector) {
        let FileName = window.location.href.split("/").reverse()[0];
        selector.find("li").each(function () {
          let anchor = $(this).find("a");
          if ($(anchor).attr("href") == FileName) {
            $(this).addClass("current");
          }
        });
        selector.children("li").each(function () {
          if ($(this).find(".current").length) {
            $(this).addClass("current");
          }
        });
        if ("" == FileName) {
          selector.find("li").eq(0).addClass("current");
        }
      }
      if ($(".main-menu__list").length) {
        let mainNavUL = $(".main-menu__list");
        dynamicCurrentMenuClass(mainNavUL);
      }
      if ($(".main-menu__nav").length && $(".mobile-nav__container").length) {
        let navContent = document.querySelector(".main-menu__nav").innerHTML;
        let mobileNavContainer = document.querySelector(
          ".mobile-nav__container"
        );
        mobileNavContainer.innerHTML = navContent;
      }
      if ($(".sticky-header__content").length) {
        let navContent = document.querySelector(".main-menu").innerHTML;
        let mobileNavContainer = document.querySelector(
          ".sticky-header__content"
        );
        mobileNavContainer.innerHTML = navContent;
      }
      if ($(".mobile-nav__container .main-menu__list").length) {
        let dropdownAnchor = $(
          ".mobile-nav__container .main-menu__list .dropdown > a"
        );
        dropdownAnchor.each(function () {
          let self = $(this);
          let toggleBtn = document.createElement("BUTTON");
          toggleBtn.setAttribute("aria-label", "dropdown toggler");
          toggleBtn.innerHTML = "<i class='fa fa-angle-down'></i>";
          self.append(function () {
            return toggleBtn;
          });
          self.find("button").on("click", function (e) {
            e.preventDefault();
            let self = $(this);
            self.toggleClass("expanded");
            self.parent().toggleClass("expanded");
            self.parent().parent().children("ul").slideToggle();
          });
        });
      }
      if ($(".mobile-nav__toggler").length) {
        $(".mobile-nav__toggler").on("click", function (e) {
          e.preventDefault();
          $(".mobile-nav__wrapper").toggleClass("expanded");
          $("body").toggleClass("locked");
        });
      }
      $(window).on("scroll", function () {
        if ($(".stricked-menu").length) {
          var headerScrollPos = 130;
          var stricky = $(".stricked-menu");
          if ($(window).scrollTop() > headerScrollPos) {
            stricky.addClass("stricky-fixed");
          } else if ($(this).scrollTop() <= headerScrollPos) {
            stricky.removeClass("stricky-fixed");
          }
        }
      });
    },
    smoothScrollbar: function () {
      if ($("body").hasClass("tt-smooth-scroll")) {
        if (!isMobile) {
          class AnchorPlugin extends Scrollbar.ScrollbarPlugin {
            static pluginName = "anchor";
            onHashChange = () => {
              $(".header-menu").animate({ height: "toggle" });
              this.jumpToHash(window.location.hash);
            };
            jumpToHash = (hash) => {
              if (!hash) {
                return;
              }
              const { scrollbar } = this;
              scrollbar.containerEl.scrollTop = 0;
              const target = document.querySelector(hash);
              if (target) {
                scrollbar.scrollIntoView(target, {
                  offsetTop:
                    parseFloat(target.getAttribute("data-offset")) || 0,
                });
              }
            };
            onInit() {
              this.jumpToHash(window.location.hash);
              window.addEventListener("hashchange", this.onHashChange);
            }
            onDestory() {
              window.removeEventListener("hashchange", this.onHashChange);
            }
          }
          Scrollbar.use(AnchorPlugin);
          const scrollbar = Scrollbar.init(
            document.querySelector("#scroll-container"),
            { damping: 0.1, renderByPixel: !0, continuousScrolling: !0 }
          );
          $("input[type=number]").on("focus", function () {
            $(this).on("wheel", function (e) {
              e.stopPropagation();
            });
          });
          const backToTopButton = document.getElementById("back-to-top");
          scrollbar.addListener(({ offset }) => {
            if (offset.y > 300) {
              backToTopButton.style.display = "block";
            } else {
              backToTopButton.style.display = "none";
            }
          });
          backToTopButton.addEventListener("click", () => {
            scrollbar.scrollTo(0, 0, 500);
          });
        }
      }
    },

    swiper: function () {
      $(document).ready(function () {
        var mySwiper = new Swiper(".swiper", {
          effect: "cards",
          grabCursor: true,
          initialSlide: 2,
          speed: 600,
          loop: true,
          rotate: true,
          mousewheel: {
            invert: false,
          },
        });

        // jQuery for custom arrow navigation
        $(".arrow-btn").click(function (e) {
          e.preventDefault(); // Prevent the default anchor click behavior
          var slideDirection = $(this).data("slide");

          if (slideDirection === "swiper-button-prev") {
            mySwiper.slidePrev(); // Move to the previous slide
          } else if (slideDirection === "swiper-button-next") {
            mySwiper.slideNext(); // Move to the next slide
          }
        });
      });
    },

    slick: function () {
      if ($(".hero-slider").length) {
        $(".hero-slider").slick({
          autoplay: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplaySpeed: 4000,
          arrows: false,
          dots: true,
          swipe: true,
          fade: true,
          responsive: [
            {
              breakpoint: 768, // For screen sizes below 768px
              settings: {
                dots: false, // Disable dots for small screens
              },
            },
          ],
        });
      }

      if ($(".gallary-slider").length) {
        $(".gallary-slider").slick({
          slidesToShow: 1,
          autoplay: true,
          dots: false,
          arrows: false,
          speed: 800,
          autoplaySpeed: 2000,
        });
      }

      if ($(".my-expert").length) {
        // $(".my-expert").slick({
        //   slidesToShow: 1,
        //   autoplay: false,
        //   dots: false,
        //   arrows: false,
        //   speed: 800,
        //   autoplaySpeed: 2000,
        //   variableWidth: true,
        //   centerMode: false,
        // });
        $(document).ready(function () {
          // Initialize the slider
          if ($(".my-expert").length) {
            $(".my-expert").slick({
              slidesToShow: 1,
              autoplay: false,
              dots: false,
              arrows: false,
              speed: 800,
              autoplaySpeed: 2000,
              variableWidth: true,
              centerMode: false,
            });
          }

          // Handle click on navigation items
          $(".nav-slider a").on("click", function () {
            // Remove active class from all links
            $(".nav-slider a").removeClass("active");
            // Add active class to the clicked link
            $(this).addClass("active");

            // Use the data-slide attribute to determine which slide to go to
            var index = $(this).index(); // Get index of clicked link
            $(".my-expert").slick("slickGoTo", index); // Go to the corresponding slide
          });

          // Optional: Handle next/prev button clicks
          $(".btn-prev").on("click", function () {
            $(".my-expert").slick("slickPrev");
          });

          $(".btn-next").on("click", function () {
            $(".my-expert").slick("slickNext");
          });
        });
      }

      $(".btn-prev").click(function () {
        var $this = $(this).attr("data-slide");
        $("." + $this).slick("slickPrev");
      });
      $(".btn-next").click(function () {
        var $this = $(this).attr("data-slide");
        $("." + $this).slick("slickNext");
      });
    },

    quantityHandle: function () {
      $(".decrement").on("click", function () {
        var qtyInput = $(this).closest(".quantity-wrap").children(".number");
        var qtyVal = parseInt(qtyInput.val());
        if (qtyVal > 0) {
          qtyInput.val(qtyVal - 1);
        }
      });
      $(".increment").on("click", function () {
        var qtyInput = $(this).closest(".quantity-wrap").children(".number");
        var qtyVal = parseInt(qtyInput.val());
        qtyInput.val(parseInt(qtyVal + 1));
      });
    },

    dropdown: function () {
      const selectedAll = document.querySelectorAll(".wrapper-dropdown");

      selectedAll.forEach((selected) => {
        const optionsContainer = selected.children[2];
        const optionsList = selected.querySelectorAll(
          "div.wrapper-dropdown li"
        );

        selected.addEventListener("click", () => {
          let arrow = selected.children[1];

          if (selected.classList.contains("active")) {
            handleDropdown(selected, arrow, false);
          } else {
            let currentActive = document.querySelector(
              ".wrapper-dropdown.active"
            );

            if (currentActive) {
              let anotherArrow = currentActive.children[1];
              handleDropdown(currentActive, anotherArrow, false);
            }

            handleDropdown(selected, arrow, true);
          }
        });

        // update the display of the dropdown
        for (let o of optionsList) {
          o.addEventListener("click", () => {
            selected.querySelector(".selected-display").innerHTML = o.innerHTML;
          });
        }
      });

      // check if anything else ofther than the dropdown is clicked
      window.addEventListener("click", function (e) {
        if (e.target.closest(".wrapper-dropdown") === null) {
          closeAllDropdowns();
        }
      });

      // close all the dropdowns
      function closeAllDropdowns() {
        const selectedAll = document.querySelectorAll(".wrapper-dropdown");
        selectedAll.forEach((selected) => {
          const optionsContainer = selected.children[2];
          let arrow = selected.children[1];

          handleDropdown(selected, arrow, false);
        });
      }

      // open all the dropdowns
      function handleDropdown(dropdown, arrow, open) {
        if (open) {
          arrow.classList.add("rotated");
          dropdown.classList.add("active");
        } else {
          arrow.classList.remove("rotated");
          dropdown.classList.remove("active");
        }
      }
    },

    categoryToggle: function () {
      if ($(".customer-container").length) {
        $(".signin-button").click(function () {
          $(".sign-form").slideToggle();
        });
      }
      if ($(".sidebar").length) {
        $(".shop-filter").on("click", function () {
          $(".toggle-sidebar").toggleClass("active");
          $(".overlay").toggleClass("active");
        });

        // Hide sidebar and overlay when overlay is clicked
        $(".overlay").on("click", function () {
          $(".toggle-sidebar").removeClass("active");
          $(this).removeClass("active");
        });
      }
      if ($("#difrent-ship").length) {
        $("#difrent-ship").on("click", function () {
          $(".box-hide").animate({ height: "toggle" }, 300);
        });
      }
    },

    filterSearch: function () {
      if ($("#searchInput").length) {
        $("#searchInput").on("keyup", function () {
          var value = $(this).val().toLowerCase();
          $(".blogs-block").filter(function () {
            var hasMatch =
              $(this).find(".blog-title").text().toLowerCase().indexOf(value) >
              -1;
            $(this).toggle(hasMatch);
          });
        });
      }
    },
    passwordIcon: function () {
      $("#eye , #eye-icon").click(function () {
        if ($(this).hasClass("fa-eye-slash")) {
          $(this).removeClass("fa-eye-slash");
          $(this).addClass("fa-eye");
          $(".password-input").attr("type", "text");
        } else {
          $(this).removeClass("fa-eye");
          $(this).addClass("fa-eye-slash");
          $(".password-input").attr("type", "password");
        }
      });
    },
    countdownInit: function (countdownSelector, countdownTime, countdown) {
      var eventCounter = $(countdownSelector);
      if (eventCounter.length) {
        eventCounter.countdown(countdownTime, function (e) {
          $(this).html(
            e.strftime(
              "<li><h4>%D</h4><p>Days</p></li>\
              <li><h4>%H</h4><p>Hrs</p></li>\
              <li><h4>%M</h4><p>Mins</p></li>\
              <li><h4>%S</h4><p>Secs</p></li>"
            )
          );
        });
      }
    },

    formValidation: function () {
      if ($(".contact-form").length) {
        $(".contact-form").validate();
      }
      if ($(".login-form").length) {
        $(".login-form").validate();
      }
    },
    contactForm: function () {
      $(".contact-form").on("submit", function (e) {
        e.preventDefault();
        if ($(".contact-form").valid()) {
          var _self = $(this);
          _self
            .closest("div")
            .find('button[type="submit"]')
            .attr("disabled", "disabled");
          var data = $(this).serialize();
          $.ajax({
            url: "./assets/mail/contact.php",
            type: "post",
            dataType: "json",
            data: data,
            success: function (data) {
              $(".contact-form").trigger("reset");
              _self.find('button[type="submit"]').removeAttr("disabled");
              if (data.success) {
                document.getElementById("message").innerHTML =
                  "<p class='color-primary mt-16 mb-16'>Email Sent Successfully</p>";
              } else {
                document.getElementById("message").innerHTML =
                  "<p class='color-primary mt-16 mb-16'>There is an error</p>";
              }
              $("#messages").show("slow");
              $("#messages").slideDown("slow");
              setTimeout(function () {
                $("#messages").slideUp("hide");
                $("#messages").hide("slow");
              }, 4000);
            },
          });
        } else {
          return !1;
        }
      });
    },
  };
  Init.i();
})(window, document, jQuery);
