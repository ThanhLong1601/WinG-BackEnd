import cron from 'node-cron';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { dataSource } from '../data-source';
import { UserModel } from '../models/user.model';
import { ContentModel } from '../models/content.model';
import { LessThanOrEqual } from 'typeorm';
import { UserContentModel } from '../models/user_content.model';

dayjs.extend(utc)
dayjs.extend(timezone)

cron.schedule('*/30 * * * *', async () => {
  const users = await dataSource.getRepository(UserModel).find();

  for ( const user of users) {
    // get user created time in UTC
    const createdAtUTC = dayjs(user.createdAt);

    // Switch createdAt to user timezone
    const createdAtInUserTZ = createdAtUTC.utcOffset(user.timezone * 60);

    // Get current time in user timezone
    const nowInUserTimezone = dayjs().utcOffset(user.timezone * 60);

    // Calculate days since created
    const daysSinceCreated = Math.floor(nowInUserTimezone.diff(createdAtInUserTZ, 'day', true));

    console.log(`🕒 User ${user.uid} - Timezone: UTC${user.timezone} - Days since created: ${daysSinceCreated}`);

    const contents = await dataSource.getRepository(ContentModel).find({
      where: { requiredMonths: LessThanOrEqual(daysSinceCreated) }
    })

    for (const content of contents) {
      const exitingAccess = await dataSource.getRepository(UserContentModel).findOne({
        where: { uid: user.uid, conid: content.conid }
      });

      if (!exitingAccess) {
        await dataSource.getRepository(UserContentModel).save({
          uid: user.uid,
          conid: content.conid
        });

        console.log(`✅ Access granted to user ${user.uid} for content ${content.conid} (Timezone: UTC${user.timezone})`);
      }
    }
  }
});


// Way 2: Get timezone when user sends account request, should get it in this form in Frontend
// const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
// Getting by name like this will be more accurate for user location than using utcOffset
// utc+7: VietNam, ThaiLand, Campuchia,...
// utc+8: China, Singapore, Philippines,...

// cron.schedule('30 11 * * *', async () => {
//   const users = await dataSource.getRepository(UserModel).find();

//   for (const user of users) {
//     if (!user.timezone) {
//       console.warn(`⚠️ User ${user.uid} has no timezone set! Skipping...`);
//       continue;
//     }

//     try {
//       const nowInUserTimeZone = dayjs().tz(user.timezone);
//       const createdAtInUserTZ = dayjs(user.createdAt).tz(user.timezone);
//       const daysSinceCreated = nowInUserTimeZone.diff(createdAtInUserTZ, 'day');

//       const contents = await dataSource.getRepository(ContentModel).find({
//         where: { requiredMonths: LessThanOrEqual(daysSinceCreated) },
//       });

//       for (const content of contents) {
//         const existingAccess = await dataSource.getRepository(UserContentModel).findOne({
//           where: { uid: user.uid, conid: content.conid },
//         });

//         if (!existingAccess) {
//           await dataSource.getRepository(UserContentModel).save({
//             uid: user.uid,
//             conid: content.conid,
//           });

//           console.log(`✅ Access granted to user ${user.uid} for content ${content.conid} (Timezone: ${user.timezone})`);
//         }
//       }
//     } catch (error) {
//       console.error(`❌ Error processing user ${user.uid}:`, error);
//     }
//   }
// });

