import React, { Component } from "react";
import "./project.scss";
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";
import { db } from "../portfolio_single_page/portfolio_sp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faArrowAltCircleLeft,
  faWindowClose
} from "@fortawesome/free-solid-svg-icons";
import ImageGallery from "react-image-gallery";
import ReactPlayer from "react-player";

export default class Project extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      imageLoaded: false,
      projectId: null,
      project: [],
      projectLenght: 0,
      images: [],
      showGallery: false,
      imagesForGallery: [],
      showVideo: false,
      name: ""
    };
    this.handleImageLoaded = this.handleImageLoaded.bind(this);
    this.changeProj = this.changeProj.bind(this);
  }

  async fetchProjects(projID) {
    await db
      .collection("projects")
      .where("index", "==", projID)
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        console.log("=====PROJECTS in project====");
        console.log(data[0]);
        this.setState({
          project: data[0],
          images: data[0].img
        });
        console.log(this.state.images);
        var arr = [];
        var len = this.state.images.length;
        for (var i = 0; i < len; i++) {
          arr.push({
            original: this.state.images[i],
            thumbnail: this.state.images[i]
          });
        }
        this.setState({
          imagesForGallery: arr
        });

        console.log(arr);
      });
  }

  async countProjects() {
    await db
      .collection("projects")
      .where("id", ">", "0")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        console.log("=====QUANTI PROGETTI?====");
        console.log(data.length);
        this.setState({ projectLenght: data.length });
      });
  }
  handleImageLoaded() {
    setTimeout(() => {
      this.setState({
        imageLoaded: true
      });
      // console.log(this.state.imageLoaded);
    }, 0);
  }
  changeProj() {
    this.setState({
      showGallery: false
    });

    setTimeout(() => {
      this.setProjId();
    }, 200);
  }
  setProjId() {
    const { projID } = this.props.match.params;
    this.setState({
      projectId: projID
    });
    this.fetchProjects(projID);
    setTimeout(() => {
      console.log("projID=====----");

      console.log(projID);
    }, 200);
  }

  componentDidMount() {
    this.setProjId();
    // this.countProjects();
  }

  render() {
    return (
      <div className="projBox">
        progetto
        {this.state.name}
      </div>
    );
  }
}
