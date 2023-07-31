import fs from 'node:fs/promises';
import { exec } from 'node:child_process';
import { OBSIDIAN_PATH } from './constants';

await createZip(OBSIDIAN_PATH);
// TODO: Move created zip file to a sync folder (OneDrive?)

/**
 * Creates Zip file in desired folder.
 * @param folderPath Folder path to be compressed
 * @param outputFileName File name that will be created
 */
async function createZip(folderPath: string, outputFileName?: string | null) {
  const dirContent = await fs.readdir(OBSIDIAN_PATH);
  if (dirContent && dirContent.length > 0) {
    for (const item of dirContent) {
      if (!item.includes('.DS_Store') && !item.includes('.zip')) {
        try {
          let name = '';
          if (!outputFileName) {
            name = item.replaceAll('\'', '').replaceAll(' ', '_') + '.zip';
          }
          const fileName = outputFileName ?? name;
          await exec(`zip -r ${fileName} *`, { cwd: folderPath });
          console.log(`${fileName} created! ☕️`);
        } catch (error) {
          console.log('!', error);
        }
      }
    }
  }
}
