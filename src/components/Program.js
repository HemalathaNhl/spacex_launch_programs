import React, { Component } from "react";
import "./Program.css";

class Program extends Component {
  // constructor() {
  //   super();

  //   this.list_Mission_Ids = "Mission Id";
  //   this.launch_year = "2006";
  //   this.launch_success = "true";
  //   this.launch_landing = "true";
  //   this.image_path = "assets/dummy-images/image1.jpeg";
  // }

  render() {
    return (
      <div className="program">
        <div className="program_row">
          <img
            className="program_image"
            src={this.props.data.links.mission_patch_small}
            alt="SpaxeX Launch Program"
          />
        </div>
        <div className="program_title program_row">
          {this.props.data.mission_name + " #" + this.props.data.flight_number}
        </div>
        <div className="program_row">
          <span className="program_sub_title">Mission Ids:</span>
          <ul>
            {this.props.data.mission_id.map((missionId) => {
              return <li className="program_sub_value">{missionId}</li>;
            })}
          </ul>
        </div>
        <div className="program_row">
          <span className="program_sub_title">Launch Year:</span>
          <span className="program_sub_value">
            {" " + this.props.data.launch_year}
          </span>
        </div>
        <div className="program_row">
          <span className="program_sub_title">Successful Launch:</span>
          <span className="program_sub_value">
            {" " + this.props.data.launch_success.toString()}
          </span>
        </div>
        <div className="program_row">
          <span className="program_sub_title">Successful Landing:</span>
          <span className="program_sub_value">
            {" " + this.props.data.rocket.first_stage.cores[0].land_success}
          </span>
        </div>
      </div>
    );
  }
}
export default Program;
