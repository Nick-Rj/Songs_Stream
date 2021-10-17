import { shallow } from "enzyme";
import { expect, it } from "@jest/globals";

import About from "./About";

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

it("rendering full DOM for About Component", () => {
  const wrapper = shallow(
    <Provider store={store}>
      <About />
    </Provider>
  );
  expect(wrapper).toMatchSnapshot();
});
