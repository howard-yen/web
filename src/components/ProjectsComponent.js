import React from 'react';
import './ProjectsComponent.css';
import {Spring, config} from 'react-spring/renderprops';
import {useSpring, animated} from 'react-spring'

import projectInfo from "./Projects.json";
import {ReactComponent as Agenda} from '../images/agenda.svg';
import {ReactComponent as Idea} from '../images/idea.svg';
import {ReactComponent as Terminal} from '../images/terminal.svg';
import {ReactComponent as Book} from '../images/book.svg';
import {ReactComponent as Clock} from '../images/clock.svg';
import {ReactComponent as Photo} from '../images/photo.svg';
import {ReactComponent as Chess} from '../images/chess.svg';
import {ReactComponent as Compressed} from '../images/compressed.svg';

// const calc = (x, y) => [-(y - window.innerHeight / 2) / 100, (x - window.innerWidth /2) /100, 1.1];
// const trans = (x,y,s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;
const trans = (x,y,s) => `perspective(600px) scale(${s})`;

const iconsize = '5em';
const icons = {
    "Idea": [
        <Idea className="Icon" style={{"stroke": "#9bf6ff"}} />,
        "#9bf6ff"
    ],
    "Agenda": [
        <Agenda className="Icon" style={{"fill": "#ffd6a5"}} />,
        "#ffd6a5"
    ],
    "Terminal":[
        <Terminal className="Icon" style={{"stroke": "#495057"}} />,
        "#495057"
    ],
    "Book":[
        <Book className="Icon" style={{"fill": "#caffbf"}} />,
        "#caffbf"
    ],
    "Clock":[
        <Clock className="Icon" style={{"fill": "#ffc6ff"}}/>,
        "#ffc6ff"
    ],
    "Photo":[
        <Photo className="Icon" style={{"fill": "#ffadad"}}/>,
        "#ffadad"
    ],
    "Chess":[
        <Chess className="Icon" style={{"fill": "#000000"}}/>,
        "#000000"
    ],
    "Compressed":[
        <Compressed className="Icon" style={{"fill": "#a0c4ff"}}/>,
        "#a0c4ff"
    ]
}

function Card(props) {
    const [p, set] = useSpring(() => (
        {xys: [0,0,1],
            config: {mass:1, tension:170, friction:26}})
    );

    var text = [];
    for(let o in props.project.others){
        text.push(<p>{o}: {props.project.others[o]}</p>)
    }

    return(
        <a
            href={props.project.url}
            title={props.project.title}
            traget="_blank"
            rel="noopener noreferrer"
            className="ProjectButton"
        >
            <animated.div
                className="Card"
                // onMouseMove={({clientX: x, clientY: y}) => set({xys: calc(x, y)})}
                onMouseMove={() => set({xys: [0,0,1.1]})}
                onMouseLeave={() => set({xys: [0,0,1]})}
                style={{transform:p.xys.interpolate(trans), "border-bottom-color":icons[props.project.icon][1], }}
            >
                {icons[props.project.icon][0]}
                <h2>{props.project.title}</h2>
                <div className="ProjectText">
                    <p style={{"text-indent": "2em", "margin-top": 0}}>{props.project.description}</p>
                    {[...text]}
                </div>

            </animated.div>
        </a>
    );
}

export default class Projects extends React.Component{
    constructor(props){
        super(props);
        this.state={
            projects:[
                {
                    url: "https://howard-yen.github.io/mangadex-download/",
                    icon: "Idea",
                    title: "mangadex-download",
                    description:"Utilized the requests, lxml, PIL, and smtplib Python libraries that uses browser cookies to search for specific titles, download a selection of the chapters as pdf files, and email them to the user."
                },
                {
                    url: "https://github.com/archen2019/pdfsummary",
                    icon: "Agenda",
                    title: "pdfsummary",
                    description:"Developed Python script for HackPrinceton 2019 that uses computer vision and machine learning algorithms to summarize a pdf file and find the key words in the content."
                },
                {
                    url: "https://github.com/archen2019/terminal-ai",
                    icon: "Terminal",
                    title: "terminal-ai",
                    description:"Algorithm that acts as a player in the game Terminal Live and employ offensive and defensive strategies against other players.\n Results: 2nd Place at Terminal Live 2020 Princeton vs. Penn"
                },
                {
                    url: "https://github.com/howard-yen/mergepdf",
                    icon: "Book",
                    title: "mergepdf",
                    description:"A simple Python script that merges all the pdf files in a given directory into one pdf file."
                },
            ],
        };
    }

    makeProjects = () =>{
        const projects = [];

        for(let p in projectInfo){
            projects.push(<Card key={projectInfo[p]["title"]} project={projectInfo[p]}/>);
        }

        return [...projects];
    }

    render(){
        const projects = this.makeProjects();
        return(
            <div className="Projects">
                <h2 style={{'font-size': '300%'}}>
                    Projects
                </h2>
                <div className="CardContainer">
                    {projects}
                </div>
            </div>
        );
    };
}
