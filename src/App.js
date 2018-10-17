import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import ReactPlayer from 'react-player'

const text1 = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt ipsum
   augue. In faucibus vehicula magna pulinar aliquam. Cras aliquam feugiat lorem non auctor.
   Quisque sed lorem egestas mauris venenatis commodo eu id nibh. Ut porta libero sed semper faucibus.`
const imgs= ["https://i.vimeocdn.com/video/595198868_505x160.jpg",
"https://i.vimeocdn.com/video/589972810_530x315.jpg",
"https://i.vimeocdn.com/video/590587169_530x315.jpg"]
const title1= `MONSOON II`
const title2= `BEAMS`
const title3= `Move 2`
const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  flex-direction: column;
  @media screen and (min-width: 1100px){
    flex-direction: row-reverse;
    max-width: 1200px;
    margin: 0 auto;
  }
`;
const FlexContainer2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  flex-direction: column-reverse;
  @media screen and (min-width: 1100px){
    flex-direction: row-reverse;
    max-width: 1200px;
    align-items: center;
    margin: 0 auto;
  }
`;
const Image = styled.img`
  width: 100%;
  max-width: 485px;
  padding: 40px;
  @media screen and (min-width: 505px) {
    max-width: 505px;
  }
`
const Text = styled.div`
  text-align: left;
  max-width: 550px;
  justify-content: center;
  @media screen and (min-width: 505px) {
    max-width: 1010px;
    min-width: 505px;
  }
`
const Title = styled.h1`
  text-align: left;
`
const Gradient = styled.div`
  background: rgb(34,34,34);
  background: linear-gradient(rgba(34,34,34,1) 0%, rgba(60,60,60,1) 50%, rgba(212,212,212,1) 100%);
  color: white;
`
class Slider extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentIndex: 0,
      translateVal: 1,
      images: ["https://i.vimeocdn.com/video/595198868_505x160.jpg",
      "https://i.vimeocdn.com/video/589972810_530x315.jpg",
      "https://i.vimeocdn.com/video/590587169_530x315.jpg"],
      videos: ["https://vimeo.com/185441790", "https://vimeo.com/129902448", "https://vimeo.com/181725879"]
    };
  }
  previousSlide = () => {
    if (this.state.currentIndex === 0) return;
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex - 1,
      translateVal: prevState.translateVal + this.slideWidth()
    }))
  }
  nextSlide = () => {
    if(this.state.currentIndex === this.state.videos.length - 1) {
      return this.setState({
        currentIndex: 0,
        translateVal: 0
      })
    }
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1,
      translateVal: prevState.translateVal + -(this.slideWidth())
    }));
  }
  slideWidth = () => {
     return document.querySelector('.slide').clientWidth
  }
  render () {
    return (
      <Carousel>
        <SliderWrap
          style={{
            transform: `translateX(${this.state.translateVal}px)`,
            transition: 'transform ease-out 0.45s'
          }}>
            {
              this.state.videos.map((video, i) => (
                <Slide key={i} video= {video}/>
              ))
            }
        </SliderWrap>
        <LeftArrow
         previousSlide={this.previousSlide}
        />
        <RightArrow
         nextSlide={this.nextSlide}
        />
      </Carousel> );
    }
}
const Slide = ({ image , video}) => {
	const styles = {
		color: "black",
    display: "inline-block",
    width: "100%",
    height: "100%"
	};
	return (
		<div className="slide" style={styles}> <ReactPlayer url={video} width="500px"/> </div>
	);
}
const Carousel = styled.div`
  position: relative;
  width: 800px;
  margin: 0 auto;
  padding: 100px;
  overflow: hidden;
  white-space: nowrap;
`
const SliderWrap = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  margin-left: 150px;
`
const Arrow = styled.div`
  border: solid black;
  opacity: 0.5;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 10px;
  cursor: pointer;
  transition: transform ease-in .1s;
`
const LeftArrow = (props) => {
  const styles = {
    position: "absolute",
    top: "50%",
    left: "100px",
    transform: "rotate(135deg)",
    WebkitTransform: "rotate(135deg)"
  };
  return( <div style={styles}
    onClick={ props.previousSlide }>
    <Arrow></Arrow>
    </div>);
}
const RightArrow = (props) => {
  const styles = {
    position: "absolute",
    top: "50%",
    right: "100px",
    transform: "rotate(-45deg)",
    WebkitTransform: "rotate(-45deg)"
  };
  return( <div style= {styles}
    onClick={ props.nextSlide }>
    <Arrow></Arrow>
    </div>);
}
class App extends Component {
  render() {
    return (
      <div>
        <FlexContainer>
          <Text> <Title> {title1} </Title> {text1}
          </Text>
          <Image src= {imgs[0]} />
        </FlexContainer>
        <Gradient>
        <FlexContainer2>
          <Image src= {imgs[1]} />
          <Text> <Title> {title2} </Title> {text1}
          </Text>
        </FlexContainer2>
        <FlexContainer>
          <Text> <Title> {title3} </Title> {text1}
          </Text>
          <Image src= {imgs[2]} />
        </FlexContainer>
        </Gradient>
        <Slider />
      </div>
    );
  }
}

export default App;
