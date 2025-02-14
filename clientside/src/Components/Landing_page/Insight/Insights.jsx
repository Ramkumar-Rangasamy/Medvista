import { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import '../Insight/Insights.css';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Aos from "aos";
import "aos/dist/aos.css";
import { Link } from 'react-router-dom';

function Insights() {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const cardData = [
        {
            category: "Viral Infections",
            date: "05 June, 2024",
            readTime: "2 min read",
            title: "Viral Infections Explained; Stages, Symptoms, and Effective Treatments",
            content: "What is a Viral Infection? A viral infection occurs when a virus enters the body, invades healthy cells, and begins to multiply.",
            author: "Dr. David Clarke",
            imageClass: "insight-image-one",
            personImageClass: "text-box-person-one-image",
            personClass: "text-box-person-one",
            link : `/blogPost/6700344a217cb210f57483a1`
        },
        {
            category: "Women's Health",
            date: "05 June, 2024",
            readTime: "2 min read",
            title: "What is Thyroid Stimulating Hormone (TSH) and why it important",
            content: "Thyroid Stimulating Hormone (TSH) plays a critical role in maintaining hormonal balance and regulating the body's metabolism, particularly in women.",
            author: "By Dr. David Clarke",
            imageClass: "insight-image-two",
            personImageClass: "text-box-person-one-image",
            personClass: "text-box-person-two",
            link : `/blogPost/67001d54217cb210f57478fe`
        },
        {
            category: "Diabetes",
            date: "05 June, 2024",
            readTime: "2 min read",
            title: "Understanding Diabetes and Managing Life with It",
            content: "Living with diabetes can be challenging, but understanding it is the first step towards managing it effectively.",
            author: "By Dr. Samuel Harris",
            imageClass: "insight-image-three",
            personImageClass: "text-box-person-two-image",
            personClass: "text-box-person-two",
            link : `/blogPost/67002f5b217cb210f5748207`
        },
        {
            category: "Asthma",
            date: "05 June, 2024",
            readTime: "2 min read",
            title: "Understanding the Different Types of Asthma",
            content: "Asthma, a chronic respiratory condition characterized by airway inflammation and constriction, affects millions of people worldwide.",
            author: "By Dr. Samuel Harris",
            imageClass: "insight-image-four",
            personImageClass: "text-box-person-two-image",
            personClass: "text-box-person-two",
            link : `/blogPost/670033bc217cb210f5748358`
        }
    ];

    const updateScreenWidth = () => setScreenWidth(window.innerWidth);
    
    useEffect(() => {
        window.addEventListener("resize", updateScreenWidth);
        Aos.init();
        return () => window.removeEventListener("resize", updateScreenWidth);
    }, []);
    
    const visibleCards = screenWidth > 768 ? 2 : 1;

    const handleLeftClick = () => {
        setCurrentCardIndex(prevIndex => (prevIndex - visibleCards + cardData.length) % cardData.length);
    };

    const handleRightClick = () => {
        setCurrentCardIndex(prevIndex => (prevIndex + visibleCards) % cardData.length);
    };

    const handlers = useSwipeable({
        onSwipedLeft: handleRightClick,
        onSwipedRight: handleLeftClick,
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    return (
        <div className="insight-background" {...handlers}>
            <div className="frame">
                <h4 className="blog" data-aos="fade-down" data-aos-duration="2000">Condition Libraries</h4>
                <h2 className="explore-insight" data-aos="fade-down" data-aos-duration="2000">Explore Insights</h2>
                <p className="insight-content" data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1000">Stay one step ahead with our dedicated latest news update blogs.</p>
                <div className="navigation">
                    <div 
                        className="left-round active" 
                        onClick={handleLeftClick}
                    >
                        <IoIosArrowBack/>
                    </div>
                    <div 
                        className="right-round active" 
                        onClick={handleRightClick}
                    >
                       <IoIosArrowForward/>
                    </div>
                </div>
            </div>
            <div className="insight-card" data-aos="fade-left"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration="500">
                {cardData.slice(currentCardIndex, currentCardIndex + visibleCards).map((card, index) => (
                    <div 
                        key={index} 
                        className={`insight-card-${index % 2 === 0 ? 'one' : 'two'} active`}
                    >
                        <div className={`insight-card-${index % 2 === 0 ? 'one' : 'two'}-background`}>
                            <div className={`insight-card-${index % 2 === 0 ? 'one' : 'two'}-inner`}>
                                <div className="image-one">
                                    <div className={card.imageClass}></div>
                                </div>
                                <div className="text-box-outter">
                                    <div className="text-box-inner-head"> 
                                        <p className="head-text">{card.category}</p> 
                                    </div>
                                    <div className="text-box-inner-date">
                                        <div className="text-box-inner-year">{card.date}</div>
                                        <div className="text-box-inner-ellipse"></div>  
                                        <div className="text-box-inner-time">{card.readTime}</div>
                                    </div>
                                    <div className="text-box-content mb-3">
                                        <div className="text-box-content-title" dangerouslySetInnerHTML={{ __html: card.title }}></div>
                                        <div className="text-box-content-sub-content">{card.content}</div>
                                    </div>
                                    <Link to={card.link}>Read more...</Link>
                                    <div className={card.personClass}>
                                        <div className={card.personImageClass}>
                                            <div className={`${card.personImageClass}-back`}></div>
                                        </div>
                                        <div className={`${card.personClass}-name`}>{card.author}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Insights;
