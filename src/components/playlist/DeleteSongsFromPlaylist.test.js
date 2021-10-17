import { shallow } from "enzyme";
import { expect, it } from "@jest/globals";

import DeleteSongsFromPlaylist from "./DeleteSongsFromPlaylist";

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

it("rendering full DOM for DeleteSongsFromPlaylist Component", () => {
  const wrapper = shallow(
    <Provider store={store}>
      <DeleteSongsFromPlaylist />
    </Provider>
  );
  expect(wrapper).toMatchSnapshot();
});
