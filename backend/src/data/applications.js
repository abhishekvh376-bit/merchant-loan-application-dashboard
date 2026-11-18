const applications = [
  ["LN-2026-1001","Aarav Retail Pvt Ltd","Aarav Mehta",1250000,"Under Review","2026-11-12"],
  ["LN-2026-1002","Bluebird Traders","Priya Nair",850000,"Approved","2026-11-11"],
  ["LN-2026-1003","Kaveri Distributors","Rohan Shetty",2100000,"Pending","2026-11-10"],
  ["LN-2026-1004","Metro Mart","Sneha Rao",650000,"Rejected","2026-11-09"],
  ["LN-2026-1005","Green Basket Stores","Vikram Das",1450000,"Under Review","2026-11-08"],
  ["LN-2026-1006","Nova Electronics","Ananya Iyer",3200000,"Approved","2026-11-07"],
  ["LN-2026-1007","Sunrise Foods","Karan Shah",975000,"Pending","2026-11-06"],
  ["LN-2026-1008","Urban Essentials","Meera Joshi",540000,"Approved","2026-11-05"],
  ["LN-2026-1009","Shree Motors","Arjun Patil",1850000,"Under Review","2026-11-04"],
  ["LN-2026-1010","Daily Needs Hub","Divya Menon",720000,"Pending","2026-11-03"],
  ["LN-2026-1011","Crestline Supplies","Rahul Verma",2600000,"Approved","2026-11-02"],
  ["LN-2026-1012","Cornerstone Stores","Ishita Kulkarni",430000,"Rejected","2026-11-01"],
  ["LN-2026-1013","Evergreen Wholesale","Manoj Kumar",1150000,"Pending","2026-10-30"],
  ["LN-2026-1014","Pixel Tech Bazaar","Neha Kapoor",2950000,"Under Review","2026-10-29"],
  ["LN-2026-1015","Coastal Fresh","Aditya Rao",880000,"Approved","2026-10-28"],
  ["LN-2026-1016","A1 Hardware","Pooja Shah",610000,"Pending","2026-10-27"],
  ["LN-2026-1017","Lakshmi Textiles","Sanjay Reddy",1750000,"Approved","2026-10-26"],
  ["LN-2026-1018","Orchid Lifestyle","Tanya Bose",1320000,"Under Review","2026-10-25"]
].map(([id, merchant, contact, amount, status, submittedAt], index) => ({
  id, merchant, contact, amount, status, submittedAt,
  email: `contact${index + 1}@example.com`,
  phone: `+91 98${String(10000000 + index * 13791).slice(0, 8)}`,
  purpose: ["Inventory expansion", "Working capital", "Equipment purchase"][index % 3],
  tenureMonths: [12, 18, 24, 36][index % 4]
}));

module.exports = applications;
