import { Card, Heading } from '@shopify/polaris'
import React from 'react'

const Faq = () => {

    const faqArray = [
        {
            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio necessitatibus fugiat nulla, debitis suscipit laboriosam, quisquam ducimus non dicta tenetur at, neque deleniti culpa dolorem aut ab cupiditate. Eligendi, quosNemo, repellat temporibus. Exercitationem consequuntur corrupti aliquid in quas eos optio magnam. Accusamus, et dolorum. Tempore, nobis voluptate sed quia sapiente laboriosam deserunt! Molestiae, qui voluptate. Dignissimos pariatur assumenda ipsa",
            question: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio necessitatibus fugiat nulla, debitis suscipit laboriosam, quisquam ducimus non dicta tenetur at, neque deleniti culpa dolorem aut ab cupiditate. Eligendi, quosNemo, repellat temporibus?"
        },
        {
            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio necessitatibus fugiat nulla, debitis suscipit laboriosam, quisquam ducimus non dicta tenetur at, neque deleniti culpa dolorem aut ab cupiditate. Eligendi, quosNemo, repellat temporibus. Exercitationem consequuntur corrupti aliquid in quas eos optio magnam. Accusamus, et dolorum. Tempore, nobis voluptate sed quia sapiente laboriosam deserunt! Molestiae, qui voluptate. Dignissimos pariatur assumenda ipsa",
            question: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio necessitatibus fugiat nulla, debitis suscipit laboriosam, quisquam ducimus non dicta tenetur at, neque deleniti culpa dolorem aut ab cupiditate. Eligendi, quosNemo, repellat temporibus?"
        },
        {
            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio necessitatibus fugiat nulla, debitis suscipit laboriosam, quisquam ducimus non dicta tenetur at, neque deleniti culpa dolorem aut ab cupiditate. Eligendi, quosNemo, repellat temporibus. Exercitationem consequuntur corrupti aliquid in quas eos optio magnam. Accusamus, et dolorum. Tempore, nobis voluptate sed quia sapiente laboriosam deserunt! Molestiae, qui voluptate. Dignissimos pariatur assumenda ipsa",
            question: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio necessitatibus fugiat nulla, debitis suscipit laboriosam, quisquam ducimus non dicta tenetur at, neque deleniti culpa dolorem aut ab cupiditate. Eligendi, quosNemo, repellat temporibus?"
        },
        {
            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio necessitatibus fugiat nulla, debitis suscipit laboriosam, quisquam ducimus non dicta tenetur at, neque deleniti culpa dolorem aut ab cupiditate. Eligendi, quosNemo, repellat temporibus. Exercitationem consequuntur corrupti aliquid in quas eos optio magnam. Accusamus, et dolorum. Tempore, nobis voluptate sed quia sapiente laboriosam deserunt! Molestiae, qui voluptate. Dignissimos pariatur assumenda ipsa",
            question: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio necessitatibus fugiat nulla, debitis suscipit laboriosam, quisquam ducimus non dicta tenetur at, neque deleniti culpa dolorem aut ab cupiditate. Eligendi, quosNemo, repellat temporibus?"
        },
    ]
    return (
        <>
            <div className='faqTitle'>
                <Heading>Frequently Asked Questions</Heading>
            </div>
                <Card sectioned>
            {faqArray && faqArray.map((i, index) => (<>

                    <b key={index}>{i.question}</b><br />
                    <p>{i.answer}</p><br />
            </>)
            )}
                </Card>

        </>
    )
}

export default Faq