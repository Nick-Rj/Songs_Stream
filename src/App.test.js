import React from "react";
import App from "./App";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { shallow } from "enzyme";
import { expect, it } from "@jest/globals";

// import App from "./App";
// import Registration from "./components/authentication/Registration";
// import UserConfirmation from "./components/authentication/UserConfirmation";
// import Login from "./components/authentication/Login";
// import SongsLibrary from "./components/songsLibrary/SongsLibrary";
// import ProfileView from "./components/authentication/ProfileView";
// import EditUserData from "./components/authentication/EditUserData";
// import ChangePassword from "./components/authentication/ChangePassword";
// import AddSongComponent from "./components/songsLibrary/AddSongComponent";
// import UpdateSongComponent from "./components/songsLibrary/UpdateSongComponent";
// import DeleteMultipleSongsComponent from "./components/songsLibrary/DeleteMultipleSongsComponent";
// import ManagePlaylists from "./components/playlist/ManagePlaylists";
// import PlaylistViewComponent from "./components/playlist/PlaylistViewComponent";
// import AddSongsToPlaylist from "./components/playlist/AddSongsToPlaylist";
// import About from "./components/dashboard/About";
// import DeleteSongsFromPlaylist from "./components/playlist/DeleteSongsFromPlaylist";
// import TopPlaylistsChart from "./components/utilities/TopPlaylistsChart";
// import PromptModal from "./components/utilities/PromptModal";
// import PageNotFound from "./components/utilities/PageNotFound";
import Dashboard from "./components/dashboard/Dashboard";

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// it("invalid path should redirect to 404", () => {
//   // const wrapper = shallow(<App />);
//   // const registration = wrapper.find(Registration);
//   const wrapper = mount(
//     <MemoryRouter initialEntries={["/register"]}>
//       <App />
//     </MemoryRouter>
//   );
//   expect(wrapper.find(Registration)).toHaveLength(0);
//   expect(wrapper.find(PageNotFound)).toHaveLength(1);
//   // expect(registration.exists()).toBe(true);
// });

// jest.mock("./components/dashboard/Dashboard");
// jest.mock("./components/authentication/Registration");

// describe("Test for User Registration Page", () => {
//   test("Should render User Registration Page ", () => {
//     //Arrange
//     Dashboard.mockImplementation(() => <div>DashboardMock</div>);
//     Registration.mockImplementation(() => <div>RegistrationMock</div>);

//     //Act
//     render(
//       <MemoryRouter>
//         <App />
//       </MemoryRouter>
//     );

//     //Assert
//     expect(screen.getByText("DashboardMock")).toBeInTheDocument();
//     expect(screen.getByText("RegistrationMock")).toBeInTheDocument();
//   });
// });

it("should render Dashboard", () => {
  const wrapper = shallow(<App />);
  const dashboard = wrapper.find(Dashboard);

  expect(dashboard.exists()).toBe(true);
});
