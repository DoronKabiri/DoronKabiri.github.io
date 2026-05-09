
curSize = 30;
curSizeSmall = 14;
curSizeH1span = parseInt($('h1').find('span').css('font-size'));
curSizeH3 = parseInt($('h3').css('font-size'));

var upClick = Cookies.get('upClick') == null ? 0 : Cookies.get('upClick');
var downClick = Cookies.get('downClick') == null ? 0 : Cookies.get('downClick');

var up = Cookies.get('upClick') == null ? 0 : Cookies.get('upClick') ;
var down = Cookies.get('downClick') == null ? 0 : Cookies.get('downClick'); ;
if (upClick === 0 && downClick === 0)
    upClick = 1;
 
//if (Cookies.get('isRestore') == "restore") {



//    $(".fixedmenu").css("max-height", "none");


//    var total = downClick > upClick ? downClick - upClick : upClick - downClick;
//    
//    if (total != 0) {

//        var increseOrDecrese = down > up ? false : true;
//       
//        if (increseOrDecrese) {

//            $(' label , button  , input , h5 , h4 , div, textarea').each(function (index) {
//                curSizeH1 = parseInt($(this).css('font-size'));
//                var max = parseInt($(this).css('font-size')) + 2 * total > 30 ? 30 : parseInt($(this).css('font-size')) + 2 * total;

//                if (parseInt($(this).css('font-size')) + 2 * total < 30)//max szie
//                {
//                    if (parseInt($(this).css('font-size')) > curSize) {
//                        console.log("hj");
//                        $(this).filter(function () {
//                            return $(this).parents('#accessibility_navigation').length === 0
//                        }).css('font-size', max);
//                    }
//                }
//                else {
//                    $(this).filter(function () {
//                        return $(this).parents('#accessibility_navigation').length === 0
//                    }).css('font-size', "30px");
//                }
//            });


//            $("h1").each(function (index) {
//                curSizeH1 = parseInt($(this).css('font-size'));
//                var max = parseInt($(this).css('font-size')) + 2 * total > 30 ? 30 : parseInt($(this).css('font-size')) + 2 * total;
//                if (parseInt($(this).css('font-size')) + 2 * total < 30)//max szie
//                {
//                    if (parseInt($(this).css('font-size')) > curSize) {
//                        console.log("hj");
//                        $(this).filter(function () {
//                            return $(this).parents('#accessibility_navigation').length === 0
//                        }).css('font-size', max);
//                    }
//                }
//                else {
//                    $(this).filter(function () {
//                        return $(this).parents('#accessibility_navigation').length === 0
//                    }).css('font-size', "30px");
//                }
//            });
//            $("p").each(function (index) {
//                curSizeH1 = parseInt($(this).css('font-size'));
//                var max = parseInt($(this).css('font-size')) + 2 * total > 30 ? 30 : parseInt($(this).css('font-size')) + 2 * total;
//                if (parseInt($(this).css('font-size')) + 2 * total < 30)//max szie
//                {
//                    if (parseInt($(this).css('font-size')) > curSize) {
//                        console.log("hj");
//                        $(this).filter(function () {
//                            return $(this).parents('#accessibility_navigation').length === 0
//                        }).css('font-size', max);
//                    }
//                }
//                else {
//                    $(this).filter(function () {
//                        return $(this).parents('#accessibility_navigation').length === 0
//                    }).css('font-size', "30px");
//                }
//            });

//            $("span").each(function (index) {
//                curSizeH1 = parseInt($(this).css('font-size'));
//                var max = parseInt($(this).css('font-size')) + 2 * total > 30 ? 30 : parseInt($(this).css('font-size')) + 2 * total;
//                if (parseInt($(this).css('font-size')) + 2 * total < 30)//max szie
//                {
//                    if (parseInt($(this).css('font-size')) > curSize) {
//                        console.log("hj");
//                        $(this).filter(function () {
//                            return $(this).parents('#accessibility_navigation').length === 0
//                        }).css('font-size', max);
//                    }
//                }
//                else {
//                    $(this).filter(function () {
//                        return $(this).parents('#accessibility_navigation').length === 0
//                    }).css('font-size', "30px");
//                }
//            });

//            $("a").each(function (index) {
//                curSizeH1 = parseInt($(this).css('font-size'));
//                var max = parseInt($(this).css('font-size')) + 2 * total > 30 ? 30 : parseInt($(this).css('font-size')) + 2 * total;
//                if (parseInt($(this).css('font-size')) + 2 * total < 30)//max szie
//                {
//                    if (parseInt($(this).css('font-size')) > curSize) {
//                        console.log("hj");
//                        $(this).filter(function () {
//                            return $(this).parents('#accessibility_navigation').length === 0
//                        }).css('font-size', max);
//                    }
//                }
//                else {
//                    $(this).filter(function () {
//                        return $(this).parents('#accessibility_navigation').length === 0
//                    }).css('font-size', "30px");
//                }
//            });


//            $('h1').find('span').each(function (index) {
//                curSizeH1 = parseInt($(this).css('font-size'));
//                var max = parseInt($(this).css('font-size')) + 2 * total > 30 ? 30 : parseInt($(this).css('font-size')) + 2 * total;
//                if (parseInt($(this).css('font-size')) + 2 * total < 30)//max szie
//                    if (parseInt($(this).css('font-size')) > curSize) {
//                        $(this).filter(function () {
//                            return $(this).parents('#accessibility_navigation').length === 0
//                        }).css('font-size', max);
//                    }
//            });

//            $('h3').each(function (index) {
//                curSizeH1 = parseInt($(this).css('font-size'));
//                var max = parseInt($(this).css('font-size')) + 2 * total > 30 ? 30 : parseInt($(this).css('font-size')) + 2 * total;
//                if (parseInt($(this).css('font-size')) + 2 * total < 30)//max szie

//                    if (parseInt($(this).css('font-size')) > curSize) {
//                        $(this).filter(function () {
//                            return $(this).parents('#accessibility_navigation').length === 0
//                        }).css('font-size', max);
//                    }
//            });



//        }
//        else {

//            $(' label , button  , input , h5 , h4 , div, textarea').each(function (index) {
//                curSizeH1 = parseInt($(this).css('font-size'));
//                var min = parseInt($(this).css('font-size')) - 2 * total < 14 ? 14 : parseInt($(this).css('font-size')) - 2 * total;
//                if (parseInt($(this).css('font-size')) + 2 * total > 14)//max szie

//                    if (parseInt($(this).css('font-size')) > curSize) {
//                        $(this).filter(function () {
//                            return $(this).parents('#accessibility_navigation').length === 0
//                        }).css('font-size', min);
//                    }
//                    else {
//                        $(this).filter(function () {
//                            return $(this).parents('#accessibility_navigation').length === 0
//                        }).css('font-size', "14px");
//                    }
//            });

//            $("h1").each(function (index) {
//                curSizeH1 = parseInt($(this).css('font-size'));
//                var min = parseInt($(this).css('font-size')) - 2 * total < 14 ? 14 : parseInt($(this).css('font-size')) - 2 * total;
//                if (parseInt($(this).css('font-size')) + 2 * total > 30)//max szie

//                    if (parseInt($(this).css('font-size')) > curSize) {
//                        $(this).filter(function () {
//                            return $(this).parents('#accessibility_navigation').length === 0
//                        }).css('font-size', "14px");
//                    }
//            });

//            $("p").each(function (index) {
//                curSizeH1 = parseInt($(this).css('font-size'));
//                var min = parseInt($(this).css('font-size')) - 2 * total < 14 ? 14 : parseInt($(this).css('font-size')) - 2 * total;
//                if (parseInt($(this).css('font-size')) + 2 * total > 14)//max szie

//                    if (parseInt($(this).css('font-size')) > curSize) {
//                        $(this).filter(function () {
//                            return $(this).parents('#accessibility_navigation').length === 0
//                        }).css('font-size', "14px");
//                    }
//            });

//            $("span").each(function (index) {
//                curSizeH1 = parseInt($(this).css('font-size'));
//                var min = parseInt($(this).css('font-size')) - 2 * total < 14 ? 14 : parseInt($(this).css('font-size')) - 2 * total;
//                if (parseInt($(this).css('font-size')) + 2 * total > 14)//max szie

//                    if (parseInt($(this).css('font-size')) > curSize) {
//                        $(this).filter(function () {
//                            return $(this).parents('#accessibility_navigation').length === 0
//                        }).css('font-size', "14px");
//                    }
//            });

//            $("a").each(function (index) {
//                curSizeH1 = parseInt($(this).css('font-size'));
//                var min = parseInt($(this).css('font-size')) - 2 * total < 14 ? 14 : parseInt($(this).css('font-size')) - 2 * total;
//                if (parseInt($(this).css('font-size')) + 2 * total > 14)//max szie

//                    if (parseInt($(this).css('font-size')) > curSize) {
//                        $(this).filter(function () {
//                            return $(this).parents('#accessibility_navigation').length === 0
//                        }).css('font-size', "14px");
//                    }
//            });


//            $('h1').find('span').each(function (index) {
//                curSizeH1 = parseInt($(this).css('font-size'));
//                var min = parseInt($(this).css('font-size')) - 2 * total < 14 ? 14 : parseInt($(this).css('font-size')) - 2 * total;
//                if (parseInt($(this).css('font-size')) + 2 * total > 14)//max szie

//                    if (parseInt($(this).css('font-size')) > curSize) {
//                        $(this).filter(function () {
//                            return $(this).parents('#accessibility_navigation').length === 0
//                        }).css('font-size', "14px");
//                    }
//            });

//            $('h3').each(function (index) {
//                curSizeH1 = parseInt($(this).css('font-size'));
//                var min = parseInt($(this).css('font-size')) - 2 * total < 14 ? 14 : parseInt($(this).css('font-size')) - 2 * total;
//                if (parseInt($(this).css('font-size')) + 2 * total > 14)//max szie

//                    if (parseInt($(this).css('font-size')) > curSize) {
//                        $(this).filter(function () {
//                            return $(this).parents('#accessibility_navigation').length === 0
//                        }).css('font-size', "14px");
//                    }
//            });


//        }

//    }


//}

var iscont = Cookies.get('cont');

if (iscont == "yes") {

    $(".widget_text").toggleClass('contrastDone');
    $(".textwidget").toggleClass('contrastDone');
    $(".textwidget").find("a").toggleClass('contrastDone');
    $("p.changeContrast").toggleClass('contrastDone');
    $("div.changeContrast").find("p a").toggleClass('contrastDone');
    $("div.changeContrast").find("span p").toggleClass('contrastDone');
    $("li.changeContrast").find("div").toggleClass('contrastDone');
    $("a.changeContrast").toggleClass('contrastDone');
    $(".colorarea.changeContrast").toggleClass('contrastDone');
    $("div.changeContrast").find("div").toggleClass('contrastDone');
    $("div.changeContrast").find("div h1").toggleClass('contrastDone');
    $("div.changeContrast").find("div h1 a").toggleClass('contrastDone');
    $("div.changeContrast").find("ul li a").toggleClass('contrastDoneMenu');
    $(".filterMenu.changeContrast").toggleClass('contrastDone');
    $("input[type='text'],input[type='email'],input[type='submit'], textarea").toggleClass('contrastDone');
    $("div.changeContrast").toggleClass('contrastDone');
    $('input').addClass('placeHolderCont');
    $('textarea').addClass('placeHolderCont');

}

// font size
$('.incfont').click(function (event) {
    up++;
    Cookies.set('upClick', up)
    Cookies.set('isRestore', "restore");

    event.preventDefault();
    $(' label , button  , input , h5 , h4 , div, textarea').each(function (index) {
        curSizeH1 = parseInt($(this).css('font-size'));
        if (parseInt($(this).css('font-size')) > curSize) {
            $(this).filter(function () {
                return $(this).parents('#accessibility_navigation').length === 0
            }).css('font-size', parseInt($(this).css('font-size')) - 2);
        }
    });


    $("h1").each(function (index) {
        curSizeH1 = parseInt($(this).css('font-size'));
        if (parseInt($(this).css('font-size')) <= curSize) {
            $(this).filter(function () {
                return $(this).parents('.accessibility-menu').length === 0
            }).css('font-size', parseInt($(this).css('font-size')) + 2);
        }

    });

    $("p").each(function (index) {
        curSizep = parseInt($(this).css('font-size'));

        if (parseInt($(this).css('font-size')) <= curSize) {
            $(this).filter(function () {
                return $(this).parents('.accessibility-menu').length === 0
            }).css('font-size', parseInt($(this).css('font-size')) + 2);
        }
    });

    $("span").each(function (index) {
        curSizeSpan = parseInt($(this).css('font-size'));
        if (parseInt($(this).css('font-size')) <= curSize) {
            $(this).filter(function () {
                return $(this).parents('.accessibility-menu').length === 0
            }).css('font-size', parseInt($(this).css('font-size')) + 2);
        }
    });

    $("a").each(function (index) {
        curSizea = parseInt($(this).css('font-size'));
        if (parseInt($(this).css('font-size')) <= curSize) {
            $(this).filter(function () {
                return $(this).parents('.accessibility-menu').length === 0
            }).css('font-size', parseInt($(this).css('font-size')) + 2);
        }
    });


    $('h1').find('span').each(function (index) {
        curSizeH1span = parseInt($(this).css('font-size'));
        if (parseInt($(this).css('font-size')) <= curSize) {
            $(this).filter(function () {
                return $(this).parents('.accessibility-menu').length === 0
            }).css('font-size', parseInt($(this).css('font-size')) + 2);
        }
    });

    $('h3').each(function (index) {
        curSizeh3 = parseInt($(this).css('font-size'));
        if (parseInt($(this).css('font-size')) <= curSize) {
            $(this).filter(function () {
                return $(this).parents('.accessibility-menu').length === 0
            }).css('font-size', parseInt($(this).css('font-size')) + 2);
        }
    });


    $(".fixedmenu").css("max-height", "none");

});

////////////////////////////////////////////////////////////////////////////////////////////////////

$('.decfont').click(function (event) {
    down++;
    Cookies.set('isRestore', "restore");
    Cookies.set('downClick', down);
    event.preventDefault();
 
    $(' label , button  , input , h5 , h4 , div, textarea').each(function (index) {
        if (parseInt($(this).css('font-size')) > curSizeSmall) {
            $(this).filter(function () {
                return $(this).parents('#accessibility_navigation').length === 0
            }).css('font-size', parseInt($(this).css('font-size')) - 2);
        }
    });


    $("h1").each(function (index) {
        curSizeH1 = parseInt($(this).css('font-size'));
        if (parseInt($(this).css('font-size')) > curSizeSmall) {
            $(this).filter(function () {
                return $(this).parents('.accessibility-menu').length === 0
            }).css('font-size', parseInt($(this).css('font-size')) - 2);
        }
    });

    $("p").each(function (index) {
        curSizep = parseInt($(this).css('font-size'));

        if (parseInt($(this).css('font-size')) > curSizeSmall) {
            $(this).filter(function () {
                return $(this).parents('.accessibility-menu').length === 0
            }).css('font-size', parseInt($(this).css('font-size')) - 2);
        }
    });

    $("span").each(function (index) {
        curSizeSpan = parseInt($(this).css('font-size'));
        if (parseInt($(this).css('font-size')) > curSizeSmall) {
            $(this).filter(function () {
                return $(this).parents('.accessibility-menu').length === 0
            }).css('font-size', parseInt($(this).css('font-size')) - 2);
        }
    });

    $("a").each(function (index) {
        curSizea = parseInt($(this).css('font-size'));
        if (parseInt($(this).css('font-size')) > curSizeSmall) {
            $(this).filter(function () {
                return $(this).parents('.accessibility-menu').length === 0
            }).css('font-size', parseInt($(this).css('font-size')) - 2);
        }
    });


    $('h1').find('span').each(function (index) {
        curSizeH1span = parseInt($(this).css('font-size'));
        if (parseInt($(this).css('font-size')) > curSizeSmall) {
            $(this).filter(function () {
                return $(this).parents('.accessibility-menu').length === 0
            }).css('font-size', parseInt($(this).css('font-size')) - 2);
        }
    });

    $('h3').each(function (index) {
        curSizeh3 = parseInt($(this).css('font-size'));
        if (parseInt($(this).css('font-size')) > curSizeSmall) {
            $(this).filter(function () {
                return $(this).parents('.accessibility-menu').length === 0
            }).css('font-size', parseInt($(this).css('font-size')) - 2);
        }
    });
 



});

///////////////////////////////////////////////////////

// open menu
$(document).keyup(function (e) {
     	  if (e.which == 9) {
                 $('.focused').removeClass('focused plain');
                 $(':focus').addClass('focused');
             	$('.off a:focus').addClass('focused plain');
             	if (e.preventDefault) {
                 	e.preventDefault();
             	}
             	return false;
         	}
     	});


      // new open\close
     	var first = false;
$( ".toggle" ).toggle(
  function() {
    $('#accessibility_navigation').css("left","0");
  }, function() {
    $('#accessibility_navigation').css("left","-180px");
  }
);


// cookie script

  $(".changeBody").click(function () {

      first = !first;

      if (first)
          Cookies.set('cont', "yes");
      else
          Cookies.set('cont', "no");

      $(".widget_text").toggleClass('contrastDone');
      $(".textwidget").toggleClass('contrastDone');
      $(".textwidget").find("a").toggleClass('contrastDone');
      $("p.changeContrast").toggleClass('contrastDone');
      $("div.changeContrast").find("p a").toggleClass('contrastDone');
      $("div.changeContrast").find("span p").toggleClass('contrastDone');
      $("li.changeContrast").find("div").toggleClass('contrastDone');
      $("a.changeContrast").toggleClass('contrastDone');
      $(".colorarea.changeContrast").toggleClass('contrastDone');
      $("div.changeContrast").find("div").toggleClass('contrastDone');
      $("div.changeContrast").find("div h1").toggleClass('contrastDone');
      $("div.changeContrast").find("div h1 a").toggleClass('contrastDone');
      $("div.changeContrast").find("ul li a").toggleClass('contrastDoneMenu');
      $(".filterMenu.changeContrast").toggleClass('contrastDone');
      $("input[type='text'],input[type='email'],input[type='submit'], textarea").toggleClass('contrastDone');
      $("div.changeContrast").toggleClass('contrastDone');
      $('input').addClass('placeHolderCont');
      $('textarea').addClass('placeHolderCont');

  });


