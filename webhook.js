const http = require('./httpCommon');

const resolveResult = fulfillmentText => res => {
  console.log('fulfillmentText', fulfillmentText);
  res.status(200).json({
    fulfillmentText
  });
};

const rejectResult = () => res => {
  res.status(200).json({
    fulfillmentText:
      'Maaf, saat ini Susi tidak bisa memproses perintah tersebut.'
  });
};

const parseSchedule = schedules => {
  return schedules
    .map(({ prescriptionId, time }) => {
      `${prescriptionId.label}, ${time}`;
    })
    .join('\n');
};

const getSchedules = () => res => {
  http
    .get(`/chat/schedule?userId=${process.env.USER_ID}`)
    .then(({ data }) => {
      data.length
        ? resolveResult(
            'Kamu tidak punya jadwal untuk minum obat. Tetap jaga kesehatan kamu ya.'
          )(res)
        : resolveResult(
            `Kamu punya jadwal untuk minum obat: ${parseSchedule(data)}`
          )(res);
    })
    .catch(err => {
      console.error(err);
      rejectResult()(res);
    });
};

const confirmMedication = () => res => {
  http
    .get(`/chat/accept?userId=${process.env.USER_ID}`)
    .then(({ data }) => {
      resolveResult('Bagus. Kamu sudah minum obat tepat pada waktunya.')(res);
    })
    .catch(err => {
      console.error(err);
      rejectResult()(res);
    });
};

const pendingMedication = () => res => {
  http
    .get(`/chat/pending?userId=${process.env.USER_ID}`)
    .then(({ data }) => {
      resolveResult(
        `Hm, yaudah 2 menit lagi ya.\nJadwal baru minum obat: ${parseSchedule(
          data
        )}`
      )(res);
    })
    .catch(err => {
      console.error(err);
      rejectResult()(res);
    });
};

module.exports = (req, res) => {
  if (req.body.queryResult) {
    const { queryText, action, parameters } = req.body.queryResult;
    switch (action) {
      case 'getSchedules':
        getSchedules()(res);
        break;
      case 'medicationRemind.medicationRemind-yes':
        confirmMedication()(res);
        break;
      case 'medicationRemind.medicationRemind-later':
        pendingMedication()(res);
        break;
      default:
        resolveResult('Cepat sembuh ya.')(res);
    }
  } else {
    rejectResult()(res);
  }
};
