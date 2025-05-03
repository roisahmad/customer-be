const Customer = require('../models/customer');
const { successResponse, errorResponse } = require('../utils/response');

exports.getGenderDistribution = async (req, res) => {
  try {
    const result = await Customer.aggregate([
      { $group: { _id: "$gender", count: { $sum: 1 } } }
    ]);
    successResponse(res, 200, 'Gender distribution retrieved successfully', result);
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

exports.getAgeDistribution = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();

    const result = await Customer.aggregate([
      {
        $addFields: {
          calculatedAge: {
            $subtract: [currentYear, "$age"]
          }
        }
      },
      {
        $bucket: {
          groupBy: "$calculatedAge",
          boundaries: [10, 20, 30, 40, 50, 60, 70],
          default: "70+",
          output: { count: { $sum: 1 } }
        }
      }
    ]);

    const labeledResult = result.map(bucket => ({
      range: bucket._id === "70+" ? "70+" : `${bucket._id}-${bucket._id + 10}`,
      count: bucket.count
    }));

    successResponse(res, 200, 'Age distribution retrieved successfully', labeledResult);
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};


exports.getBrandDeviceDistribution = async (req, res) => {
  try {
    const result = await Customer.aggregate([
      { $group: { _id: "$brandDevice", count: { $sum: 1 } } }
    ]);
    successResponse(res, 200, 'Brand device distribution retrieved successfully', result);
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

exports.getDigitalInterestDistribution = async (req, res) => {
  try {
    const result = await Customer.aggregate([
      { $group: { _id: "$digitalInterest", count: { $sum: 1 } } }
    ]);
    successResponse(res, 200, 'Digital interest distribution retrieved successfully', result);
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

exports.getLoginHourDistribution = async (req, res) => {
  try {
    const result = await Customer.aggregate([
      {
        $addFields: {
          hour: {
            $toInt: {
              $arrayElemAt: [
                { $split: ["$loginHour", ":"] },
                0
              ]
            }
          }
        }
      },
      {
        $bucket: {
          groupBy: "$hour",
          boundaries: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
                       13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
          default: "Unknown",
          output: { count: { $sum: 1 } }
        }
      }
    ]);

    const labeledResult = result.map(bucket => {
      if (bucket._id === "Unknown") {
        return { range: "Unknown", count: bucket.count };
      }
      const start = String(bucket._id).padStart(2, "0") + ":00";
      const end = String(bucket._id + 1).padStart(2, "0") + ":00";
      return { range: `${start} - ${end}`, count: bucket.count };
    });

    successResponse(res, 200, 'Login hour distribution retrieved successfully', labeledResult);
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

exports.getLocationDistribution = async (req, res) => {
  try {
    const result = await Customer.aggregate([
      { $group: { _id: "$nameOfLocation", count: { $sum: 1 } } }
    ]);
    successResponse(res, 200, 'Location distribution retrieved successfully', result);
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

exports.getVisitDateTrend = async (req, res) => {
  try {
    const result = await Customer.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    successResponse(res, 200, 'Visit date trend retrieved successfully', result);
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};
