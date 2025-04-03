const API_BASE_URL = "http://localhost:3000/api/v1/apply";

const getAuthToken = () => localStorage.getItem("token"); // Retrieve JWT token

export const submitVolunteerForm = async (formData) => {
  const cityMap = {
    "Indianapolis": 1,
    "New York": 6,
    "Los Angeles": 2,
    "Chicago": 3
  };

  const countryMap = {
    "United States": 1,
    "India": 2,
    "Canada": 3,
    "Australia": 4
  };

  const toISO = (date) => {
    if (!date || !date.includes('/')) return '';
    const [month, year] = date.split('/');
    return `${year}-${month.padStart(2, '0')}-01`;
  };
const allowedOptSupport = [
  "Yes, the OPT period has started",
  "Yes, approved but have not received the EAD card",
  "No"
];

let optSupportValue = "No"; // Default fallback

if (Array.isArray(formData.optSupport)) {
  const match = formData.optSupport.find(val => allowedOptSupport.includes(val));
  if (match) optSupportValue = match;
} else if (allowedOptSupport.includes(formData.opt_support)) {
  optSupportValue = formData.opt_support;
}
  const transformedData = {
    first_name: formData.first_name,
    middle_name: formData.middle_name,
    last_name: formData.last_name,
	birth_date: formData.birth_date,
    personal_email: formData.personal_email,
    phone: formData.phone_number,
    phonetype: formData.phonetype || "Mobile",
    address_line_1: formData.address_line_1,
    city_id: cityMap[formData.city],
    state: formData.state,
    zip_code: formData.zip_code,
    country_id: countryMap[formData.country] || 1,
    gender: formData.gender,
    opt_support: optSupportValue,
    visa_status: formData.visa_status,
    start_date: formData.start_date,
    hours_commitment: parseInt(formData.hours_commitment, 10) || 0,
    why_kworks: formData.why_kworks || formData.interestReason,
    application_status: "pending",
    linkedin_url: formData.linkedin_url || "",
    additional_websites: formData.website || "",
    additional_info: formData.additionalInfo || "",
	time_zone: formData.time_zone, 
    sexual_orientation: formData.sexualOrientation,
    disability: formData.disability,
    educations: (formData.educations || []).map((edu) => ({
      institution_name: edu.institution_name,
      degree: edu.degree,
      major: edu.major,
      start_date: toISO(edu.start_date),
      end_date: toISO(edu.end_date)
    })),
    employments: (formData.employments || []).map((job) => ({
      company_name: job.company_name,
      job_title: job.job_title,
      location: job.location,
      start_date: toISO(job.start_date),
      end_date: toISO(job.end_date),
      responsibilities: job.responsibilities
    })),
	...(formData.address_line_2 && { address_line_2: formData.address_line_2 })
  };

  // Optional cleanup
  if (!formData.resume) delete transformedData.resume;

  try {
    const response = await fetch("http://localhost:3000/api/v1/apply/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(transformedData)
    });

    const result = await response.json();
    console.log("🔹 Server Response Status:", response.status);
    console.log("🔹 Server Response Data:", result);

    if (!response.ok) {
      throw new Error("Server Error: " + response.status);
    }

    return { success: true, data: result };
  } catch (error) {
    console.error("❌ API Request Failed:", error);
    return { success: false, message: error.message };
  }
};


