import { fail } from '@sveltejs/kit';
import { writeFileSync } from 'fs';
import { extname } from 'path';

export const actions = {
	default: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());

		if (
			!(formData.fileToUpload as File).name ||
			(formData.fileToUpload as File).name === 'undefined'
		) {
			return fail(400, {
				error: true,
				message: 'You must provide a file to upload'
			});
		}

		const { fileToUpload } = formData as { fileToUpload: File };

		// Write the file to the uploads folder
		writeFileSync(
			`uploads/${crypto.randomUUID()}${extname(fileToUpload?.name)}`,
			Buffer.from(await fileToUpload.arrayBuffer())
		);

		return {
			success: true
		};
	}
};
