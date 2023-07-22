$(function () {
    //===============================================
    // スライダー
    //===============================================
    const swiper = new Swiper(".swiper", {
        loop: true, //ループ
        slidesPerView: 3, //表示させるスライドの枚数を指定

        // loop: true のときのみ
        // 複製するスライド数を指定。0 だとループが滑らかに繋がらないことがあるため 1 以上がお勧め
        loopAdditionalSlides: 2,
        //自動再生
        autoplay: {
            delay: 4000, //次のスライドに切り替わるまでの時間を指定（ミリ秒）
            disableOnInteraction: false, //true：ユーザーが操作したときに自動再生を止める
        },
        //ブレークポイントごとにパラメータを変更する
        breakpoints: {
            0: {
                slidesPerView: "1.5",
                spaceBetween: 24, //スライド間の余白を指定（px）
            },
            600: {
                slidesPerView: "auto",
                spaceBetween: 24,
            },
        },
    });

    //================================================
    //ハンバーガーメニュー
    //================================================
    $(".js-humberger").on("click", function () {
        $(".js-humberger").toggleClass("is-active");
        $(".js-menu").toggleClass("is-open");
    });
    $(".c-menu__item a").on("click", function () {
        $(".js-humberger").removeClass("is-active");
        $(".js-menu").removeClass("is-open");
    });

    //===============================================
    //アコーディオン
    //================================================
    $(".c-accordion__title").on("click", function () {
        $(this).next().slideToggle();
        $(this).toggleClass("open");
        $(".c-accordion__title").not($(this)).next().slideUp();
        $(".c-accordion__title").not($(this)).removeClass("open");
    });

    //================================================
    //ローディング
    //================================================
    $(function () {
        //読み込みが完了したら実行する
        $(window).on("load", function () {
            //ローディングアニメーションをフェードアウト
            $("#loading").delay(400).fadeOut(400);
        });

        setTimeout(function () {
            $("#loading").fadeOut(400);
        }, 5000);
    });
    //================================================
    //ふわっとアニメーション
    //================================================

    function fadeAnime() {
        // ふわっ
        $(".fadeUpTrigger").each(function () {
            //fadeUpTriggerというクラス名が
            var elemPos = $(this).offset().top - 50; //要素より、50px上の
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (scroll >= elemPos - windowHeight) {
                $(this).addClass("fadeUp"); // 画面内に入ったらfadeUpというクラス名を追記
            } else {
                $(this).removeClass("fadeUp"); // 画面外に出たらfadeUpというクラス名を外す
            }
        });
    }

    // 画面をスクロールをしたら動かしたい場合の記述
    $(window).scroll(function () {
        fadeAnime(); /* アニメーション用の関数を呼ぶ*/
    }); // ここまで画面をスクロールをしたら動かしたい場合の記述

    // //スムーススクロール
    // $("a[href^=#]").click(function () {
    //     var speed = 800; // スクロール速度(ミリ秒)
    //     var href = $(this).attr("href");
    //     var target = $(href == "#" || href == "" ? "html" : href);
    //     var position = target.offset().top;
    //     $("html").animate({ scrollTop: position }, speed, "swing");
    //     return false;
    // });

    //================================================
    //コンタクトフォームの必須入力欄を埋めないと送信ボタンを押させない
    //================================================
});
