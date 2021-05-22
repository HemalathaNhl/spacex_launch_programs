import React, { Component } from "react";
import "./App.css";
import Program from "./components/Program";

class App extends Component {
  constructor() {
    super();
    this.launchYears = [
      "2006",
      "2007",
      "2008",
      "2009",
      "2010",
      "2011",
      "2012",
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
      "2020",
    ];
    this.launchSuccessful = ["true", "false"];
    this.landSuccessful = ["true", "false"];
    //
    this.applyLaunchSuccessfulFilter = function (e, isLaunch) {
      this.initLaunchSuccessfulFilterBtns();
      e.target.classList.add("btn_selected");
      let apiPath =
        "https://api.spaceXdata.com/v3/launches?limit=100&launch_success=" +
        isLaunch;

      this.applyFilters(apiPath);
    };
    this.applyLandSuccessfulFilter = function (e, isLand) {
      this.initLandSuccessfulFilterBtns();
      e.target.classList.add("btn_selected");
      let apiPath =
        "https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true&land_success=" +
        isLand;

      this.applyFilters(apiPath);
    };
    this.applyLaunchYearFilter = function (e, year) {
      this.initLaunchYearFilterBtns();
      e.target.classList.add("btn_selected");
      let apiPath =
        "https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true&land_success=true&launch_year=" +
        year;

      this.applyFilters(apiPath);
    };
    //
    this.state = {
      programsFromServer: null,
    };
    this.applyFilters = function (apiPath) {
      fetch(apiPath)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("responseJson", responseJson);
          this.setState({ programsFromServer: responseJson });
        })
        .catch((error) => {
          console.error(error);
        });
    };
    this.resetFilterBtns = function (btns) {
      btns.forEach((btn) => {
        if (btn.classList.contains("btn_selected"))
          btn.classList.remove("btn_selected");
        btn.classList.add("btn_normal");
      });
    };
    this.initLaunchYearFilterBtns = function () {
      let btns = document.querySelectorAll(".btn_launch_year_filter");
      this.resetFilterBtns(btns);
    };
    this.initLaunchSuccessfulFilterBtns = function () {
      let btns = document.querySelectorAll(".btn_launch_successful_filter");
      this.resetFilterBtns(btns);
    };
    this.initLandSuccessfulFilterBtns = function () {
      let btns = document.querySelectorAll(".btn_land_successful_filter");
      this.resetFilterBtns(btns);
    };
    this.initFilterBtns = function () {
      this.initLaunchYearFilterBtns();
      this.initLaunchSuccessfulFilterBtns();
      this.initLandSuccessfulFilterBtns();
    };
    this.initProgram = function () {
      let apiPath = "https://api.spaceXdata.com/v3/launches?limit=100";
      this.applyFilters(apiPath);
    };
  }
  componentDidMount() {
    this.initFilterBtns();
    this.initProgram();
  }
  render() {
    return (
      <div className="App">
        <div id="app_title">SpaceX Launch Programs</div>
        <div id="container">
          <div id="filters">
            <div id="filters_title">Filters</div>
            <div className="filter_sub_title">Launch Year</div>
            <hr />
            <div id="launch_year_filter_btns">
              {this.launchYears.map((year) => (
                <div>
                  <button
                    className="btn_launch_year_filter"
                    onClick={(e) => this.applyLaunchYearFilter(e, year)}
                  >
                    {year}
                  </button>
                </div>
              ))}
            </div>
            <div className="filter_sub_title">Successful Launch</div>
            <hr />
            <div id="launch_successful_filter_btns">
              {this.launchSuccessful.map((isLaunch) => (
                <div>
                  <button
                    className="btn_launch_successful_filter"
                    onClick={(e) =>
                      this.applyLaunchSuccessfulFilter(e, isLaunch)
                    }
                  >
                    {isLaunch}
                  </button>
                </div>
              ))}
            </div>
            <div className="filter_sub_title">Successful Landing</div>
            <hr />
            <div id="land_successful_filter_btns">
              {this.landSuccessful.map((isLand) => (
                <div>
                  <button
                    className="btn_land_successful_filter"
                    onClick={(e) => this.applyLandSuccessfulFilter(e, isLand)}
                  >
                    {isLand}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div id="programs">
            {this.state.programsFromServer ? (
              this.state.programsFromServer.map((programData) => {
                return <Program data={programData} />;
              })
            ) : (
              <div className="data_loading">
                Fetching programs data from server...
              </div>
            )}
          </div>
        </div>
        <div id="developer">Developed by: Hemalatha N</div>
      </div>
    );
  }
}

export default App;
