import React, { useState, useRef, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import '../assets/css/FaqAccordion.css';

const questions = [
    {
        title: 'How do I sign up for an account?',
        content: 'To sign up for an account, click on the "Sign Up" button at the top right corner of the homepage. Fill out the registration form with your details and click on the "Sign Up" button to create your account.',
    },
    {
        title: 'How do I reset my password?',
        content: 'If you forgot your password, click on the "Forgot Password" link on the login page. Enter your email address and click on the "Reset Password" button. You will receive an email with instructions on how to reset your password.',
    },
    {
        title: 'How do I make a purchase?',
        content: 'To make a purchase, click on the "Add to Cart" button next to the product you want to buy. Once you have added all the products to your cart, click on the "Cart" icon at the top right corner of the page. Review your cart and click on the "Checkout" button to proceed to the payment page. Enter your payment details and click on the "Place Order" button to complete the purchase.',
    },
    {
        title: 'How do I track my order?',
        content: 'To track your order, click on the "Track Order" link at the top right corner of the homepage. Enter your order number and email address and click on the "Track" button to view the status of your order.',
    },
    {
        title: 'How do I return a product?',
        content: 'To return a product, click on the "Return" link at the bottom of the homepage. Fill out the return form with your order number, email address, and reason for return. Click on the "Submit" button to initiate the return process. You will receive an email with instructions on how to return the product.',
    },
];

const FaqAccordion = () => {
    const [active, setActive] = useState([]);

    const toggleAccordion = (index) => {
        if (active.includes(index)) {
            setActive(active.filter((i) => i !== index));
        } else {
            setActive([...active, index]);
        }
    };

    const contentRefs = useRef([]);

    useEffect(() => {
        contentRefs.current.forEach((ref, index) => {
            ref.style.maxHeight = active.includes(index)
                ? `${ref.scrollHeight}px`
                : "0px";
        });
    }, [active]);

    return (
        <div>
            <h2>FAQ/Accordion</h2>
            <div className="faq-section">
                {questions.map((question, index) => (
                    <button
                        className={`question-section ${active.includes(index) ? 'active' : ''}`}
                        key={index}
                        onClick={() => toggleAccordion(index)}
                    >
                        <div className="question-align">
                            <h4 className="question-style">{question.title}</h4>
                            <FiPlus
                                className={active.includes(index) ? `question-icon rotate` : `question-icon`}
                            />
                        </div>
                        <div
                            ref={(ref) => (contentRefs.current[index] = ref)}
                            className={active.includes(index) ? `answer answer-divider` : `answer`}
                        >
                            <p>{question.content}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FaqAccordion;