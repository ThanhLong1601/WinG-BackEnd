import cron from 'node-cron';
import { dataSource } from '../data-source';
import { UserModel } from '../models/user.model';
import dayjs from 'dayjs';
import { ContentModel } from '../models/content.model';
import { LessThan, LessThanOrEqual } from 'typeorm';
import { UserContentModel } from '../models/user_content.model';


cron.schedule('36 12 * * *', async () => {
  const users = await dataSource.getRepository(UserModel).find();

  for ( const user of users) {
    const daysSinceCreated = dayjs().diff(user.createdAt, 'day');

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
          conid: content.conid,
          isAccess: true
        });

        console.log(`Access granted to user ${user.name} for content ${content.title}`);
      }
    }
  }
});

