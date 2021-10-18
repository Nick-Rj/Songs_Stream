import React, { useEffect, useState } from "react";
import { Container, Row, Button, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllPlaylists } from "../../redux/store";
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
} from "chart.js";

import LoaderAnimation from "./LoaderAnimation";
import "../../assets/styles/TopPlaylistsChart.css";

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);

const TopPlaylistsChart = ({
  songData,
  playlistData,
  getAllPlaylists,
  history,
  ...props
}) => {
  const currentPlaylistID = props.location.state[0] || -1;

  const [playlists, setPlaylists] = useState(props.location.state[1] || []);
  const [topPlaylists, setTopPlaylists] = useState([]);

  let topPlaylistsData = [];
  const RouteHandler = useHistory();

  const fetchTopPlaylists = () => {
    getAllPlaylists();
    const sortedPlaylist = playlists.sort(
      (a, b) => b.accessCount - a.accessCount
    );

    for (let i = 0; i < 5; i++) {
      setTopPlaylists([topPlaylists.push(sortedPlaylist[i])]);
    }

    topPlaylistsData = topPlaylists.map((playlist) => [
      playlist.id,
      playlist.title,
    ]);
  };

  const displayChart = () => {
    const ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: topPlaylists.map((playlist) => playlist.title),
        datasets: [
          {
            label: "Top Playlists Chart",
            data: topPlaylists.map((playlist) => playlist.accessCount),
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(75, 192, 192)",
              "rgb(255, 205, 86)",
              "rgb(201, 203, 207)",
              "rgb(54, 162, 235)",
            ],

            hoverOffset: 4,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
            labels: {
              color: "rgb(56, 219, 105)",
            },
          },
        },
      },
    });
  };

  useEffect(() => {
    setTimeout(fetchTopPlaylists, 2000);

    setTimeout(() => {
      displayChart();
      viewChart();
    }, 4000);
  }, []);

  const backtoPlaylist = () => {
    RouteHandler.push({
      pathname: `/playlists/${currentPlaylistID}`,
      state: songData,
    });
  };

  const viewChart = () => {
    document.getElementById("loadingAnimation").style.display = "none";
    document.getElementById("chart").style.display = "block";
  };
  return (
    <div className="TopPlaylistsChart">
      <Container id="header">
        <Row>
          <Col>
            <Button variant="warning" id="backToLib" onClick={backtoPlaylist}>
              Back to Playlist
            </Button>
          </Col>
          <Col xs={2} lg={4}></Col>
          <Col xs={2} lg={4}></Col>
        </Row>
        <Row>
          <Col>
            <h1>Top Charts of Playlists</h1>
          </Col>
        </Row>
      </Container>
      <Container id="loadingAnimation">
        <Row>
          <Col></Col>
          <Col>
            <LoaderAnimation />
          </Col>
          <Col></Col>
        </Row>
      </Container>
      <Container
        style={{ width: "20rem", height: "20rem", display: "none" }}
        id="chart"
      >
        <Row>
          <Col>
            <canvas id="myChart" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    songData: state.song,
    playlistData: state.playlist,
  };
};

export default connect(mapStateToProps, { getAllPlaylists })(TopPlaylistsChart);
