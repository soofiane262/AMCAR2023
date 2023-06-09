import { useEffect, useState } from "react";
import { getSpeakers } from "../utils/StorageModifiers";
import { Speaker } from "../constants/Speakers";
import SpeakersList from "../components/SpeakersList";

export default function SpeakersScreen() {
	const [speakers, setSpeakers] = useState<Speaker[]>([]);

	useEffect(() => {
		const loadSpeakers = async () => {
			const data = await getSpeakers();
			data.sort((a: Speaker, b: Speaker) => a.name.localeCompare(b.name));
			setSpeakers(data);
		};
		loadSpeakers();
	}, []);

	return <SpeakersList data={speakers} />;
}
