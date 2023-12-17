import { ElementRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { UploadedFile } from './uploaded-file';

export const DISPLAYABLE_CONTENT = ['gif', 'jpeg', 'jpg', 'png'];

export function insertUploadingText(
  filename: string,
  commentField: AbstractControl,
  commentTextArea: ElementRef<HTMLTextAreaElement>
): string {
  const originalDescription = commentField.value;

  const fileType = filename.split('.').pop();
  let toInsert: string;
  if (DISPLAYABLE_CONTENT.includes(fileType.toLowerCase())) {
    toInsert = `![Uploading ${filename}...]\n`;
  } else {
    toInsert = `[Uploading ${filename}...]\n`;
  }

  const cursorPosition = commentTextArea.nativeElement.selectionEnd;
  const endOfLineIndex = originalDescription.indexOf('\n', cursorPosition);
  const nextCursorPosition = cursorPosition + toInsert.length;

  if (endOfLineIndex === -1) {
    if (commentField.value === '') {
      commentField.setValue(toInsert);
    } else {
      commentField.setValue(`${commentField.value}\n${toInsert}`);
    }
  } else {
    const startTillNewline = originalDescription.slice(0, endOfLineIndex + 1);
    const newlineTillEnd = originalDescription.slice(endOfLineIndex);
    commentField.setValue(`${startTillNewline + toInsert + newlineTillEnd}`);
  }

  commentTextArea.nativeElement.setSelectionRange(nextCursorPosition, nextCursorPosition);
  return toInsert;
}

// Gets the markdown insertable url from the upload url for video
function getInsertUrlVideo(uploadUrl: string) {
  const insertedString = `<i><video controls><source src="${uploadUrl}" type="video/mp4">Your browser does not support the video tag.</video><br>video:${uploadUrl}</i>`;

  return insertedString;
}

// Gets the markdown insertable url from the upload url for non-video files
function getInsertUrl(filename: string, uploadUrl: string) {
  const insertedString = `[${filename}](${uploadUrl})`;
  return insertedString;
}

// Get the content to append from the uploaded file array
export function getContentToAppend(uploadedFiles: UploadedFile[]) {
  let contentToAppend = '';
  for (const file of uploadedFiles) {
    const fileType = file.displayName.split('.').pop();
    let prefix = '';
    if (DISPLAYABLE_CONTENT.includes(fileType.toLowerCase())) {
      prefix = '!';
    }
    if (file.isVideo) {
      contentToAppend = contentToAppend.concat(prefix + getInsertUrlVideo(file.url) + '  \n');
    } else {
      contentToAppend = contentToAppend.concat(prefix + getInsertUrl(file.displayName, file.url) + '  \n');
    }
  }
  return contentToAppend;
}

export function insertContent(commentField: AbstractControl, uploadedFiles: UploadedFile[]) {
  commentField.setValue(commentField.value.concat(getContentToAppend(uploadedFiles)));
}
