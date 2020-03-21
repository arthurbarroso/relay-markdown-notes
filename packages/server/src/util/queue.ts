import Bee from 'bee-queue';
import redisConfig from '../config/redis';

import RegisteredEmail from '../jobs/RegisteredEmail';

const jobs = [RegisteredEmail];

class Queue {
  private queues = {};

  constructor() {
    this.init();
  }

  private init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: {
            host: redisConfig.host,
          },
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];
      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.error(`Queue ${job.queue.name}: FAILED`, err); //eslint-disable-line
  }
}

export default new Queue();
