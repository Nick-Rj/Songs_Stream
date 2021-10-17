import { shallow } from "enzyme";
import { expect, it } from "@jest/globals";

import ProfileView from "./ProfileView";

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

it("rendering full DOM for ProfileView Component", () => {
  const wrapper = shallow(
    <Provider store={store}>
      <ProfileView />
    </Provider>
  );
  expect(wrapper).toMatchSnapshot();
});
