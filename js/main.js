/* -------------------------------------------

Name: Treto
Version: 1.0
Developer: MillerDigitalDesign
Author:	bslthemes (https://bslthemes.com)

------------------------------------------- */

$(function () {

    "use strict";

    $(window).on("scroll", function () {
        var scroll = $(window).scrollTop();

        if (scroll >= 30) {
            $(".mil-top-panel").addClass("mil-active");
        } else {
            $(".mil-top-panel").removeClass("mil-active");
        }

        // Logo switching for home section on desktop
        if (window.innerWidth >= 768) {
            var homeSection = $('[data-name="Home"]');
            if (homeSection.length) {
                var homeSectionTop = homeSection.offset().top;
                var homeSectionBottom = homeSectionTop + homeSection.outerHeight();
                var currentScroll = $(window).scrollTop();
                var windowHeight = $(window).height();
                
                // Check if we're in the home section viewport
                if (currentScroll < homeSectionBottom - 100) {
                    $(".mil-top-panel").addClass("mil-home-section");
                } else {
                    $(".mil-top-panel").removeClass("mil-home-section");
                }
            }
        } else {
            // On mobile, always use black logo
            $(".mil-top-panel").removeClass("mil-home-section");
        }
    });

    // Initial logo state check on page load
    $(window).trigger('scroll');

    // Also check on window resize
    $(window).on('resize', function() {
        $(window).trigger('scroll');
    });

    var swiper = new Swiper('.mil-timeline-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 800,
        parallax: true,
        navigation: {
            prevEl: '.mil-timeline-prev',
            nextEl: '.mil-timeline-next',
        },
        pagination: {
            el: '.mil-timeline-pagination',
            type: 'fraction',
            clickable: true,
        },
        breakpoints: {
            992: {
                slidesPerView: 2,
            },
        },
    });

    var swiper = new Swiper('.mil-timeline-slider-2', {
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 800,
        parallax: true,
        navigation: {
            prevEl: '.mil-timeline-2-prev',
            nextEl: '.mil-timeline-2-next',
        },
        pagination: {
            el: '.mil-timeline-2-pagination',
            type: 'fraction',
            clickable: true,
        },
        breakpoints: {
            992: {
                slidesPerView: 3,
            },
        },
    });

    var swiper = new Swiper('.mil-reviews-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 800,
        parallax: true,
        navigation: {
            prevEl: '.mil-reviews-prev',
            nextEl: '.mil-reviews-next',
        },
        pagination: {
            el: '.mil-reviews-pagination',
            type: 'fraction',
            clickable: true,
        },
    });

    $('.mil-menu-btn').on('click', function () {
        $('.mil-menu-btn , .mil-top-panel nav').toggleClass('mil-active');
    });

    $('.mil-filter a').on('click', function () {
        $('.mil-filter .mil-current').removeClass('mil-current');
        $(this).addClass('mil-current');

        var selector = $(this).data('filter');
        $('.mil-portfolio-grid').isotope({
            filter: selector
        });
        return false;

    });

    var $container = $('.mil-portfolio-grid').isotope({
        itemSelector: '.mil-grid-item',
        transitionDuration: '0.5s',
        masonry: {
            columnWidth: '.grid-sizer'
        }
    });

    /**
		Image Popup
	**/
	$('.mfp-image').magnificPopup();

    /*
		Gallery popup
	*/
	$('.mfp-gallery').on('click', function() {
		var gallery = $(this).attr('href');

		$(gallery).magnificPopup({
			delegate: 'a',
			type:'image',
			closeOnContentClick: false,
			mainClass: 'mfp-fade',
			removalDelay: 160,
			fixedContentPos: false,
			gallery: {
				enabled: true
			}
		}).magnificPopup('open');

		return false;
	});

    /**
		Validate Form
	**/
	if($('.cform').length) {
		$('#cform').validate({
			rules: {
				name: {
					required: true
				},
				tel: {
					required: true
				},
				email: {
					required: true,
					email: true
				},
                subject: {
					required: true
				},
				message: {
					required: true
				},
                checkmark: {
					required: true
				}
			},
			success: 'valid',
			submitHandler: function() {
				$.ajax({
					url: 'mailer/feedback.php',
					type: 'post',
					dataType: 'json',
					data: 'name='+ $("#cform").find('input[name="name"]').val() + '&email='+ $("#cform").find('input[name="email"]').val() + '&tel='+ $("#cform").find('input[name="tel"]').val() + '&subject='+ $("#cform").find('input[name="subject"]').val() + '&message='+ $("#cform").find('textarea[name="message"]').val(),
					beforeSend: function() {
	
					},
					complete: function() {
	
					},
					success: function(data) {
						$('#cform').fadeOut();
						$('.alert-success').delay(1000).fadeIn();
					}
				});
			}
		});
	}

    /**
		Validate Form 2
	**/
	if($('.cform-two').length) {
		$('#cform-two').validate({
			rules: {
				name: {
					required: true
				},
				email: {
					required: true,
					email: true
				},
				message: {
					required: true
				},
                checkmark: {
					required: true
				}
			},
			success: 'valid',
			submitHandler: function() {
				$.ajax({
					url: 'mailer/feedback-two.php',
					type: 'post',
					dataType: 'json',
					data: 'name='+ $("#cform-two").find('input[name="name"]').val() + '&email='+ $("#cform-two").find('input[name="email"]').val() + '&message='+ $("#cform-two").find('textarea[name="message"]').val(),
					beforeSend: function() {
	
					},
					complete: function() {
	
					},
					success: function(data) {
						$('#cform-two').fadeOut();
						$('.alert-success').delay(1000).fadeIn();
					}
				});
			}
		});
	}

});

const typingContainer = document.getElementById('typing-effect');

if (typingContainer) {
    const vChar = typingContainer.querySelector('.v-char');
    const nameText = typingContainer.querySelector('.name-text');
    const fullText = "edant Misra";
    const typeSpeed = 120;
    const deleteSpeed = 70;
    const pause = 2000;

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const setContent = (text, withCursor = true) => {
        if (withCursor) {
            nameText.innerHTML = `${text}<span class="cursor"></span>`;
        } else {
            nameText.innerHTML = text;
        }
    };

    const runAnimation = async () => {
        while (true) {
            // Start with full name
            vChar.classList.remove('rotated');
            setContent(fullText, false);
            await sleep(pause);

            // Rotate V
            vChar.classList.add('rotated');
            await sleep(300); // Wait for rotation to finish

            // Erase
            for (let i = fullText.length; i > 0; i--) {
                setContent(fullText.substring(0, i - 1));
                await sleep(deleteSpeed);
            }
            
            // Pause with empty text
            setContent('');
            await sleep(500);
            
            // Type
            for (let i = 0; i < fullText.length; i++) {
                setContent(fullText.substring(0, i + 1));
                await sleep(typeSpeed);
            }

            // Rotate V back
            vChar.classList.remove('rotated');
            setContent(fullText, false); // Hide cursor
            await sleep(pause);
        }
    };
    
    runAnimation();
}

/* Circular Slider - Technology Section */
( function() {
    'use strict';

    function startSetup( sliderSize, slideSize, animationDuration, autoplayInterval ) {
        this.sliderSize        = parseFloat( sliderSize )/100;
        this.slideSize         = parseFloat( slideSize )/100;
        this.animationDuration = parseFloat( animationDuration );
        this.autoplayInterval  = parseFloat( autoplayInterval );
    };

    function Slider( newSlider, sliderSize, slideSize, animationDuration, autoplayInterval ) {
        this.startSetup           = new startSetup( sliderSize, slideSize, animationDuration, autoplayInterval ),
        this.wrapper              = newSlider.querySelector( '.wrapper' );
        this.slides               = newSlider.querySelectorAll( '.circular-slider .wrapper .slides-holder .slides-holder__item' );
        this.slidesSize           = 0;
        this.descriptionsHolder   = newSlider.querySelector( '.circular-slider .wrapper .descriptions' );
        this.descriptions         = newSlider.querySelectorAll( '.circular-slider .wrapper .descriptions .descriptions__item' );
        this.slidesHolder         = newSlider.querySelector( '.circular-slider .wrapper .slides-holder' );
        this.btnLeft              = newSlider.querySelector( '.circular-slider .wrapper .controls .controls__left' );
        this.btnRight             = newSlider.querySelector( '.circular-slider .wrapper .controls .controls__right' );
        this.btnAutoplay          = newSlider.querySelector( '.circular-slider .wrapper .controls .controls__autoplay' );
        this.currentAngle         = 0;
        this.stepAngle            = 2*Math.PI/newSlider.querySelectorAll( '.circular-slider .wrapper .slides-holder .slides-holder__item' ).length;
        this.currentSlide         = 0;

        this.slidesHolder.style.transitionDuration = this.startSetup.animationDuration + 'ms';
        this.onResize();
        this.setAutoplay();
        this.setNav();
        this.addStyle();

        let _this = this;
        this.btnAutoplay.onclick = function() {
            if( this.classList.contains( 'controls__autoplay_running' ) ) {
                this.classList.remove( 'controls__autoplay_running' );
                this.classList.add( 'controls__autoplay_paused' );
                clearInterval( _this.autoplay );
                _this.autoplay = null;
            } else {
                this.classList.remove( 'controls__autoplay_paused' );
                this.classList.add( 'controls__autoplay_running' );
                _this.setAutoplay(); 
            }
        }
    };

    Slider.prototype.onResize = function() {
        let radius,
            w = this.wrapper.parentNode.getBoundingClientRect().width,
            h = this.wrapper.parentNode.getBoundingClientRect().height;

        2*h <= w ? radius = h*this.startSetup.sliderSize
                 : radius = ( w/2 )*this.startSetup.sliderSize;

        this.setSize( Math.round( radius ) );
    };

    Slider.prototype.setSize = function( radius ) {
        this.wrapper.style.width  = 2*radius + 'px';
        this.wrapper.style.height = radius + 'px';

        let r                         = 2*radius*( 1 - this.startSetup.slideSize );
        this.slidesHolder.style.width = this.slidesHolder.style.height = r + 'px';
        this.slidesRepositioning( r/2 );

        this.slidesHolder.style.marginTop    = radius*this.startSetup.slideSize + 'px';
        this.descriptionsHolder.style.width  = ( r/2 - r*this.startSetup.slideSize + 20)*2 + 'px';
        this.descriptionsHolder.style.height = r/2 - r*this.startSetup.slideSize + 20 + 'px';

        this.slidesSize                        = Math.min( 2*radius*this.startSetup.slideSize, this.stepAngle*radius*( 1 - this.startSetup.slideSize ) - 50 );
        this.descriptionsHolder.style.fontSize = window.innerHeight < window.innerWidth ? '1.2vh' : '1.2vw';
        
        for( let i = 0; i < this.slides.length; i++ ) {
            this.slides[i].style.width = this.slides[i].style.height = this.slidesSize + 'px';
        };
    };

    Slider.prototype.slidesRepositioning = function( r ) {
        for( let i = 0; i < this.slides.length; i++ ) {
            let x = r*Math.cos( this.stepAngle*i - Math.PI/2 ),
                y = r*Math.sin( this.stepAngle*i - Math.PI/2 );
            this.slides[i].style.transform = 'translate( ' + x  + 'px, ' + y + 'px ) rotate( ' + this.stepAngle*180/Math.PI*i + 'deg )';
        };
    };

    Slider.prototype.rotate = function( multiplier ) {
        let _this = this;
        this.removeStyle();
        this.resetNavs();

        if( this.currentSlide === this.slides.length - 1  && multiplier === -1 ) {
            this.slidesHolder.style.transform     = 'rotate( -360deg )';
            this.currentSlide = this.currentAngle = 0;
            this.addStyle();

            setTimeout( function(){
                _this.slidesHolder.style.transitionDuration = 0 + 's';
                _this.slidesHolder.style.transform          = 'rotate( ' + _this.currentAngle + 'deg )';
                setTimeout( function() { _this.slidesHolder.style.transitionDuration = _this.startSetup.animationDuration + 'ms'; }, 20 );
            }, this.startSetup.animationDuration );

        } else if ( this.currentSlide === 0 && multiplier === 1 ) {
            this.slidesHolder.style.transform = 'rotate( ' + this.stepAngle*180/Math.PI + 'deg )';
            this.currentSlide                 = _this.slides.length - 1;
            this.currentAngle                 = -( 2*Math.PI - _this.stepAngle )*180/Math.PI;
            this.addStyle();

            setTimeout( function(){
                _this.slidesHolder.style.transitionDuration = 0 + 's';
                _this.slidesHolder.style.transform = 'rotate( ' + _this.currentAngle + 'deg )';
                setTimeout( function() { _this.slidesHolder.style.transitionDuration = _this.startSetup.animationDuration + 'ms'; }, 20 );
            }, this.startSetup.animationDuration );

        } else {
            this.currentSlide                -= multiplier;
            this.currentAngle                += ( this.stepAngle*180/Math.PI )*multiplier;
            this.slidesHolder.style.transform = 'rotate( ' + this.currentAngle + 'deg )';
            this.addStyle();
        };
    };

    Slider.prototype.setNav = function() {
        let _this              = this;
        _this.btnLeft.onclick  = function() { _this.rotate(1) };
        _this.btnRight.onclick = function() { _this.rotate(-1) };
    };

    Slider.prototype.disableNav = function() {
        this.btnLeft.onclick  = null;
        this.btnRight.onclick = null;
    };

    Slider.prototype.setAutoplay = function() {
        let _this     = this;
        this.autoplay = setInterval( function() { _this.rotate(-1) }, _this.startSetup.autoplayInterval + 20 ); 
    };

    Slider.prototype.removeStyle = function() {
        let x = this.currentSlide;
        this.descriptions[x].classList.remove( 'descriptions__item_visible' );
        this.slides[x].classList.remove( 'slides-holder__item_active' );
        this.slides[x].style.height = this.slides[x].style.width = this.slidesSize + 'px';
        
        // Remove watermark
        const watermarks = document.querySelectorAll('.watermark-img');
        if (watermarks[x]) {
            watermarks[x].classList.remove('watermark-active');
        }
    };

    Slider.prototype.addStyle = function() {
        let x = this.currentSlide;
        this.descriptions[x].classList.add( 'descriptions__item_visible' );
        this.slides[x].classList.add( 'slides-holder__item_active' );
        this.slides[x].style.height = this.slides[x].style.width = this.slidesSize + 20 + 'px';
        
        // Add watermark
        const watermarks = document.querySelectorAll('.watermark-img');
        if (watermarks[x]) {
            watermarks[x].classList.add('watermark-active');
        }
    };

    Slider.prototype.resetNavs = function() {
        let _this = this;
        this.disableNav();
        setTimeout( function(){ _this.setNav() }, this.startSetup.animationDuration + 20 );
        if ( this.autoplay != null ) {
            clearInterval( this.autoplay );
            this.setAutoplay();
        };
    };

    // Initialize portfolio slider when DOM is loaded
    function initPortfolioSlider() {
        const sliderElement = document.querySelector( '.mil-portfolio-slider' );
        if (sliderElement) {
            window.portfolioSlider = new Slider( sliderElement, 105, 12, 950, 4000 );
            
            window.addEventListener('resize', function() {
                if (window.portfolioSlider) {
                    window.portfolioSlider.resetNavs();
                    window.portfolioSlider.onResize();
                }
            });
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPortfolioSlider);
    } else {
        initPortfolioSlider();
    }

  } )();

/* Education Modal System */
let currentEducationId = 'penn-state';
let scrollPosition = 0;

// Array of education IDs in order for navigation
const educationOrder = ['penn-state', 'nmims', 'rajhans', 'gokuldhaam'];

function openEducationModal(educationId, event) {
    // Prevent event bubbling to avoid slider navigation
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }
    
    currentEducationId = educationId;
    const modal = document.getElementById('educationModal');
    const modalBody = document.getElementById('educationModalBody');
    
    // Get the content template and clone it
    const template = document.getElementById(`modal-content-${educationId}`);
    if (template) {
        modalBody.innerHTML = template.innerHTML;
    } else {
        console.error(`No template found for education ID: ${educationId}`);
        return;
    }
    
    modal.classList.add('active');
    
    // Lock background scrolling
    lockScroll();
    
    // Update navigation buttons
    updateModalNavigation();
}

function closeEducationModal() {
    const modal = document.getElementById('educationModal');
    modal.classList.remove('active');
    
    // Unlock background scrolling
    unlockScroll();
}

function navigateEducationModal(direction) {
    const currentIndex = educationOrder.indexOf(currentEducationId);
    const newIndex = currentIndex + direction;
    
    if (newIndex >= 0 && newIndex < educationOrder.length) {
        const newEducationId = educationOrder[newIndex];
        currentEducationId = newEducationId;
        
        const modalBody = document.getElementById('educationModalBody');
        const template = document.getElementById(`modal-content-${newEducationId}`);
        
        if (template) {
            modalBody.innerHTML = template.innerHTML;
        } else {
            console.error(`No template found for education ID: ${newEducationId}`);
            return;
        }
        
        updateModalNavigation();
    }
}

function updateModalNavigation() {
    const prevBtn = document.querySelector('.mil-modal-prev');
    const nextBtn = document.querySelector('.mil-modal-next');
    
    if (prevBtn && nextBtn) {
        const currentIndex = educationOrder.indexOf(currentEducationId);
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === educationOrder.length - 1;
    }
}

function lockScroll() {
    // Save current scroll position
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    
    // Add lock class to body
    document.body.classList.add('modal-scroll-locked');
    document.body.style.top = `-${scrollPosition}px`;
}

function unlockScroll() {
    // Remove lock class from body
    document.body.classList.remove('modal-scroll-locked');
    document.body.style.top = '';
    
    // Restore scroll position
    window.scrollTo(0, scrollPosition);
}





// Close modal with ESC key and keyboard navigation
document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('educationModal');
    const isModalOpen = modal && modal.classList.contains('active');
    
    if (isModalOpen) {
        if (e.key === 'Escape') {
            closeEducationModal();
        } else if (e.key === 'ArrowLeft') {
            navigateEducationModal(-1);
        } else if (e.key === 'ArrowRight') {
            navigateEducationModal(1);
        }
    }
});

// Event listeners for Learn More buttons using data attributes
document.addEventListener('DOMContentLoaded', function() {
    // Add click event listeners to all Learn More buttons
    const learnMoreButtons = document.querySelectorAll('.mil-learn-more-btn[data-education-target]');
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const educationId = this.getAttribute('data-education-target');
            openEducationModal(educationId, e);
        });
    });
    
    // Prevent modal close when clicking inside modal content
    const modalContent = document.querySelector('.mil-modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
});
