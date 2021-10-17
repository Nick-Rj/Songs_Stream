import { shallow } from "enzyme";
import { expect, it } from "@jest/globals";

import PlaylistViewComponent from "./PlaylistViewComponent";

import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = configureMockStore();
const store = mockStore({
  userState: {
    loading: false,
    users: [],
    user: {},
    error: "",
    isLoggedIn: false,
  },
  songData: { loading: false, songs: [], error: "" },
  playlistData: { loading: false, playlists: [], error: "" },
});

it("rendering full DOM for PlaylistViewComponent Component", () => {
  const wrapper = shallow(
    <Provider store={store}>
      <PlaylistViewComponent />
    </Provider>
  );
  expect(wrapper).toMatchSnapshot();
});
