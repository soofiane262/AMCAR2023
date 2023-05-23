import * as React from "react";
import renderer from "react-test-renderer";

import { Regular } from "../StyledText";

it(`renders correctly`, () => {
	const tree = renderer.create(<Regular>Snapshot test!</Regular>).toJSON();

	expect(tree).toMatchSnapshot();
});
