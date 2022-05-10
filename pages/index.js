// https://int.logifleet360.ch/lfr3/eg-services/login
import {useEffect, useState} from "react";
import style from "../styles/login/login.module.scss"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from 'react-responsive-carousel';
import { Formik, Field, Form, FormikHelpers } from 'formik';

function _processCssContent(carouselEntryId, cssContent) {
    var i = 0,
        sizeCssContent = cssContent.length,
        strCss = carouselEntryId + '\n';
    cssContent.split('').forEach(function (str, index) {
        strCss = strCss + str;
        if (str === '}' && index !== sizeCssContent - 1) {
            strCss = strCss + '\n' + carouselEntryId;
        }
    });
    return strCss;
}

function login() {
    var username = document.querySelector('#username').value
    var password = document.querySelector('#password').value
    fetch('http://localhost:3000/lfr3/eg-services/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
        }),
    })
        .then((r) => r.json())
        .then((data) => {
            console.log(data);
        });
}

function Login({carousels}) {
    useEffect(() => {
        var cssContent = '',
            style = document.createElement('style'),
            head = document.head;
        carousels.forEach(function (carousel_entry, index) {
            if (carousel_entry.cssContent != null && carousel_entry.cssContent !== '') {
                cssContent += _processCssContent('#carousel_' + carousel_entry.id, carousel_entry.cssContent);
            }
        });
        style.setAttribute('type', 'text/css');
        style.append(cssContent);
        head.append(style);
    })
    return (
        <>
            <div className={style.container}>
                <div className={style.leftContainer}>
                    <div className={style.carouselContainer}>
                        <div className={style.carouselLogoContainer}>
                            <div className={style.carouselLogo}>
                                <a href="https://logifleet.ch/" className="logo" target="_blank">
                                    <img src="/img/logifleet/2021-Logo.svg"></img>
                                </a>
                            </div>
                        </div>
                        <div className={style.carouselSlideContainer}>
                            <Carousel autoPlay={true} infiniteLoop={true} stopOnHover={true}
                                      interval={6500} transitionTime={1500} showThumbs={false}>
                                {carousels.map(carousel => {
                                    return (
                                        <div id={'carousel_' + carousel.id} key={carousel.id}
                                             dangerouslySetInnerHTML={{__html: carousel.htmlContent}}></div>
                                    )
                                })}
                            </Carousel>
                        </div>
                        <div className={style.carouselFooter}>
                            <div className={style.carouselFooterSwissContainer}>
                                <a href="https://www.swissmadesoftware.org/" className="logo-swiss-made"
                                   target="_blank">
                                    <img src="/img/logifleet/swiss-logo.png"></img>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className={style.leftContainerFooter}>
                        <span>© 2021 Logifleet SA, Tous droits réservés. | </span>
                        <a href="https://www.logifleet.ch/privacy/" target="_blank" className="logifleet-footer-url">Politique
                            de confidentialité</a>
                    </div>
                </div>
                <div className={style.rightContainer}>
                    <div className={style.loginFormContainer}>
                        <div className={style.loginFormTitle}>
                            <span>Log in Logifleet 360°</span>
                        </div>
                        <div className={style.loginFormForm}>
                            <Formik
                                initialValues={{
                                    username: '',
                                    password: '',
                                }}
                                onSubmit={({username, password}) => {
                                    setTimeout(() => {
                                        fetch('http://localhost:3000/lfr3/eg-services/login', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify({
                                                username,
                                                password,
                                            }),
                                        })
                                            .then((r) => r.json())
                                            .then((data) => {
                                                console.log(data);
                                            });
                                    }, 500);
                                }}>
                                <Form>
                                    <Field id="username" name="username" placeholder="Username"/>
                                    <Field type="password" id="password" name="password" placeholder="Password" />
                                    <button type="submit">Login</button>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login

export async function getStaticProps() {
    const response = await fetch('http://localhost:3000/lfr3/eg-services/carousel')
    const data = await response.json()
    return {
        props: {
            carousels: data
        }
    }
}
