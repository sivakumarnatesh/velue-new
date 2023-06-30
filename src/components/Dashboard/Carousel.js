import { Images } from "../../assets/Images/Images";
import Title from "../../sharedComponents/Title/Title";
import "./Carousel.scss";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const Carousel = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    // initialSlide: 0,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 3,
    //       slidesToScroll: 3,
    //       infinite: true,
    //       dots: true,
    //     },
    //   },
    //   {
    //     breakpoint: 600,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 2,
    //       initialSlide: 2,
    //     },
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //     },
    //   },
    // ],
  };
  function Arrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block"}}
        onClick={onClick}
      />
    );
  }

  return (
    // <div className="dashboardCarousel">
    <Slider {...settings}>
      <div className="card_container">
        <div className="card_carousel">
          <img src={Images.Tap} alt="productimg" />
        </div>
        <div className="carousel_body">
          <div className="CarouselTitle">Neo Slim Washing Machine Top</div>
          <div className="GoodsDetails">
            <Title title="Goods ID:" className="TGoodsId" />
            <Title title="ID458563" className="Pcs" />
          </div>
          <div className="hr"></div>
          <Title title="650 Pcs" className="PcsAmount" />
        </div>
      </div>
      <div className="card_container">
        <div className="card_carousel">
          <img src={Images.Tap} alt="productimg" />
        </div>
        <div className="carousel_body">
          <div className="CarouselTitle">Neo Slim Washing Machine Top</div>
          <div className="GoodsDetails">
            <Title title="Goods ID:" className="TGoodsId" />
            <Title title="ID458563" className="Pcs" />
          </div>
          <div className="hr"></div>
          <Title title="650 Pcs" className="PcsAmount" />
        </div>
      </div>
      <div className="card_container">
        <div className="card_carousel">
          <img src={Images.Tap} alt="productimg" />
        </div>
        <div className="carousel_body">
          <div className="CarouselTitle">Neo Slim Washing Machine Top</div>
          <div className="GoodsDetails">
            <Title title="Goods ID:" className="TGoodsId" />
            <Title title="ID458563" className="Pcs" />
          </div>
          <div className="hr"></div>
          <Title title="650 Pcs" className="PcsAmount" />
        </div>
      </div>
      <div className="card_container">
        <div className="card_carousel">
          <img src={Images.Tap} alt="productimg" />
        </div>
        <div className="carousel_body">
          <div className="CarouselTitle">Neo Slim Washing Machine Top</div>
          <div className="GoodsDetails">
            <Title title="Goods ID:" className="TGoodsId" />
            <Title title="ID458563" className="Pcs" />
          </div>
          <div className="hr"></div>
          <Title title="650 Pcs" className="PcsAmount" />
        </div>
      </div>
      <div className="card_container">
        <div className="card_carousel">
          <img src={Images.Tap} alt="productimg" />
        </div>
        <div className="carousel_body">
          <div className="CarouselTitle">Neo Slim Washing Machine Top</div>
          <div className="GoodsDetails">
            <Title title="Goods ID:" className="TGoodsId" />
            <Title title="ID458563" className="Pcs" />
          </div>
          <div className="hr"></div>
          <Title title="650 Pcs" className="PcsAmount" />
        </div>
      </div>
    </Slider>
    // </div>
  );
};

export default Carousel;
