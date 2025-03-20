import { SUBMISSION_STATUS } from "../../../constants/art_journal.constants";
import { toUserArtDTO } from "../../../dtos/user_art.dto";
import { getArtById, getSubmissionByUaid, saveSubmissionArt } from "../../../repositories/art_journal.repository";
import { getUserByUid, updateUserPoint } from "../../../repositories/user.repository";
import { ApiError } from "../../../utils/apiError";

export async function saveDrawingUncomplete(uid: string, aid: string, body: any) {
  await getUserByUid(uid);

  const artJournal = await getArtById(aid);
  if (!artJournal) {
    throw new ApiError({ message: 'Art Journal not found!', status: 404, data: null });
  }
  const submissionDate = new Date();
  const pointsEarned = artJournal.point;
  const submittedArtWork = body.canvas;

  const newSubmission = {
    uid,
    aid,
    submissionDate,
    pointsEarned,
    submittedArtWork,
    canvas: body.canvas,
    userThoughts: body.userThoughts || "",
    status: SUBMISSION_STATUS.UNCOMPLETE,
  }

  const updated = await saveSubmissionArt(newSubmission);

  return toUserArtDTO(updated);
};

export async function updatedDrawing(uid: string, uaid: string, body: any) {
  await getUserByUid(uid);

  const submission = await getSubmissionByUaid(uaid);
  if (!submission) {
    throw new ApiError({ message: 'Submission not found!', status: 404, data: null });
  }

  if (submission.status === SUBMISSION_STATUS.COMPLETE) {
    throw new ApiError({ message: 'Submission already completed!', status: 400, data: null });
    
  }

  const updatedData = {
    ...submission,
    submittedArtWork: body.canvas ?? submission.submittedArtWork,
    canvas: body.canvas || submission.canvas,
    userThoughts: body.userThoughts?.trim() || submission.userThoughts,
    submissionDate: new Date(),
  }

  const updated = await saveSubmissionArt(updatedData);

  return toUserArtDTO(updated);
}

export async function submitDrawing(uid: string, uaid: string) {
  const user = await getUserByUid(uid);

  const submission = await getSubmissionByUaid(uaid);
  if (!submission) {
    throw new ApiError({ message: 'Submission not found!', status: 404, data: null });
  }

  if (submission.status === SUBMISSION_STATUS.COMPLETE) {
    throw new ApiError({ message: 'Submission already completed!', status: 400, data: null });
    
  }

  submission.status = SUBMISSION_STATUS.COMPLETE;
  submission.submissionDate = new Date();

  await updateUserPoint(user.uid, submission.pointsEarned);

  const updated = await saveSubmissionArt(submission);

  return toUserArtDTO(updated);
}