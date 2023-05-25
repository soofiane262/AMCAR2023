import { useEffect, useState } from "react";
import { getModerators } from "../utils/StorageModifiers";
import { Speaker } from "../constants/Speakers";
import SpeakersList from "../components/SpeakersList";

export default function ModeratorsScreen() {
	const [moderators, setModerators] = useState<Speaker[]>([]);

	useEffect(() => {
		const loadSpeakers = async () => {
			const data = await getModerators();
			data.sort((a: Speaker, b: Speaker) => a.name.localeCompare(b.name));
			setModerators(data);
		};
		loadSpeakers();
	}, []);

	return <SpeakersList data={moderators} />;
}
