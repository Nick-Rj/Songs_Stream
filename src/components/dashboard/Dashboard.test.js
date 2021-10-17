import { shallow } from "enzyme";
import { expect, it } from "@jest/globals";
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

import Dashboard from "./Dashboard";

it("rendering full DOM for Dashboard Component", () => {
  const wrapper = shallow(
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
  expect(wrapper).toMatchSnapshot();
});
