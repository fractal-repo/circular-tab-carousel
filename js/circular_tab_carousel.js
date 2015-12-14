function cust_slider(carouselObj){
            $(carouselObj).each(function(){
                var cObj = this;
                var sliderTab = $(cObj).find(".carousel-tab");
                var sliderCont = $(cObj).find(".carousel-cont");
                var centerIndx = $(sliderTab).find("ul li").index($(sliderTab).find("ul li.center"));
                var slideTabLen = $(sliderTab).find("ul li").length;
                var displayItem =5;
                var cloneItem = (displayItem-1);
                var diffCloneItem = cloneItem - centerIndx;
                var aniobj = false;

                //initial con center
                $(sliderCont).find("ul li.nav-cont-list").removeClass("center").eq(centerIndx).addClass("center")


                $(sliderTab).find("ul li").each(function(e){
                    $(this).attr("itm_no",e)
                })
                $(sliderCont).find("ul li.nav-cont-list").each(function(e){
                    $(this).attr("cont_no",e)
                })
                
                $(sliderTab).find("ul").width($(sliderTab).find("ul li").width()*$(sliderTab).find("ul li").length)
                $(sliderCont).find("ul").width($(sliderCont).find("ul li.nav-cont-list").width()*$(sliderCont).find("ul li.nav-cont-list").length)
                
                var initPos = function(){
                    var lPos = (($(sliderTab).find("ul li").width() )* (cloneItem/2))
                    $(sliderTab).find("ul").css({left:-lPos})
                    
                }
               
                var contLpos = $(sliderCont).find("ul li.nav-cont-list").width()*centerIndx
                
                $(sliderCont).find("ul li.nav-cont-list").hide();
                $(sliderCont).find("ul li.nav-cont-list").eq(centerIndx).show();
                var changePos = function(indx){
                    var cenIndx = $(sliderTab).find("ul li").index($(sliderTab).find("ul li.center"));
                    console.log(indx+" : "+cenIndx)
                    diffIndx = Math.abs(indx-cenIndx);
                    aniobj = true;
                    var aniPos = $(sliderTab).find("ul li").width()*indx - (($(sliderTab).find("ul li").width() )* (cloneItem/2))
                    var contIndx = $(sliderTab).find("ul li").eq(indx).attr("itm_no")
                    if(indx > cenIndx)
                    {

                        
                        $(sliderCont).find("ul li.nav-cont-list").eq(contIndx).css({"left":980,"z-index":10})
                        $(sliderCont).find("ul li.nav-cont-list").eq(contIndx).show(1).animate({"left":0},300,function(){
                            $(sliderCont).find("ul li.nav-cont-list").not(":eq("+contIndx+")").hide()
                            $(sliderCont).find("ul li.nav-cont-list").css("z-index","1") 
                             
                        })
                    }
                    if(indx < cenIndx)
                    {
                        $(sliderCont).find("ul li.nav-cont-list").eq(contIndx).css({"left":-980,"z-index":10})
                        $(sliderCont).find("ul li.nav-cont-list").eq(contIndx).show(1).animate({"left":0},300,function(){
                            $(sliderCont).find("ul li.nav-cont-list").not(":eq("+contIndx+")").hide()
                            $(sliderCont).find("ul li.nav-cont-list").css("z-index","1") 
                            
                        })
                    }

                    $(sliderTab).find("ul").animate({left:-aniPos},300,function(){

                         if(indx > cenIndx)
                        {
                            for(var i=0;i<diffIndx;i++)
                            {
                                var obj = $(sliderTab).find("ul li").eq(0)
                                
                                $(sliderTab).find("ul").append(obj);
                                var lPos = $(sliderTab).find("ul").position().left+$(sliderTab).find("ul li").width();
                                console.log(lPos+" : "+$(sliderTab).find("ul").css("left"))
                                $(sliderTab).find("ul").css("left",lPos)
                            }

                            
                        }
                         if(indx < cenIndx)
                        {
                            for(var i=0;i<diffIndx;i++)
                            {
                                var obj = $(sliderTab).find("ul li").eq($(sliderTab).find("ul li").length-1)
                                $(sliderTab).find("ul").prepend(obj);
                                var lPos = $(sliderTab).find("ul").position().left-$(sliderTab).find("ul li").width();
                                console.log(lPos+" : "+$(sliderTab).find("ul").css("left"))
                                $(sliderTab).find("ul").css("left",lPos)

                                
                            }
                        }
                        aniobj = false;

                    });
                    
                    $(sliderTab).find("ul li").removeClass("center").eq(indx).addClass("center");
                    var activeContHtml = $(sliderTab).find("ul li").eq(indx).find(".nav-link-cont").html();
                    $(".active-tab").html(activeContHtml).find("a").removeAttr("href");




                }

                $(cObj).find(".nav-next").on("click",function(){

                    var ind = $(sliderTab).find("ul li").index($(sliderTab).find("ul li.center"));
                    if(aniobj==false)
                    changePos(ind+1)
                })
                $(cObj).find(".nav-prev").on("click",function(){
                    var ind = $(sliderTab).find("ul li").index($(sliderTab).find("ul li.center"));
                    if(aniobj==false)
                    changePos(ind-1)
                })
                $(sliderTab).find("ul").on("click","li",function(){
                    var indx = $(sliderTab).find("ul li").index(this);
                    if(aniobj==false)
                    changePos(indx)
                })
                

            })

        }


/* Document Ready */

$(function() {

    $("a").each(function() {
        if ($(this).attr("href") == "#" || $(this).attr("href") == " ") {
            $(this).attr("href", "javascript:void(0)");
        }
    });

    if ($(".tab-link").length != 0) {
        showHide(".tab-nav", ".tab-cont-sec", ".icon-close");
    }

    cust_slider(".slider-wrap")
});