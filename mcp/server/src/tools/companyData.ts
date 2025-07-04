import axios from "axios";

export const COMPANY_TOOL_NAME = "get_company_details";

//  TODO: Make sure that the enum is coming from the API

export const COMPANY_TOOL_SCHEMA = {
  name: COMPANY_TOOL_NAME, // A more descriptive name for the tool
  description:
    "Fetches key company insights across all industry verticals or a specified one. Use this to retrieve relevant information to support prospecting, engagement, or sales targeting efforts.",
  inputSchema: {
    type: "object",
    properties: {
      vertical: {
        type: "string",
        description:
          "Use this to narrow the search to a specific industry vertical (e.g., 'healthcare', 'finance', 'retail') to get more tailored company insights. If not provided, defaults to 'All' to include companies from all sectors. Ideal when you're looking to understand a company's positioning within a specific industry.",
        default: "All",
        enum: [
          "Retail & eCommerce",
          "Security & Compliance",
          "Travel & Hospitality",
          "Cloud Enablement & DevOps",
          "Gen AI & Intelligent Automation",
          "Airlines",
          "FinTech & Payments",
          "App Modernisation & Product Engineering",
          "Data Engineering & AI Readiness",
        ],
      },
      company: {
        type: "string",
        description:
          "Specify the company name for which you're seeking business, technical, or strategic insights. Use this when you want to prepare for outreach, understand the company’s tech landscape, key focus areas, or identify entry points for sales engagement. The more precise the company name, the more relevant the insights.",
        enum: [
          "IBM",
          "Check Point",
          "UiPath",
          "Deloitte",
          "Amazon",
          "Microsoft",
          "TCS",
          "Hilton",
          "Zoom",
          "Maersk",
          "OpenAI",
          "Google Cloud",
          "Meta",
          "IHG Hotels & Resorts",
          "Lyft",
          "HSBC",
          "Four Seasons",
          "DHL",
          "InterContinental Hotels Group (IHG)",
          "Stripe",
          "Citi",
          "DeepMind",
          "Sophos",
          "Southwest Airlines",
          "Intel",
          "Goldman Sachs",
          "Delta",
          "Shopify",
          "Thoughtworks",
          "Netflix",
          "Hawaiian Airlines",
          "ServiceNow",
          "Walmart",
          "Siemens",
          "Mastercard",
          "Cisco",
          "Alibaba",
          "Lockheed Martin",
          "JP Morgan Chase",
          "JetBlue Airways",
          "Cloudera",
          "AT&T",
          "Marriott International",
          "Adobe",
          "Block (formerly Square)",
          "FedEx",
          "ANA",
          "Best Buy",
          "Delta Airlines",
          "Hyatt",
          "Accenture",
          "Rackspace",
          "Google",
          "Digital Ocean",
          "Globant",
          "United Airlines",
          "Lufthansa",
          "Emirates",
          "Airbnb",
          "Kroger",
          "PayPal",
          "Wipro",
          "Infosys",
          "Intuit",
          "Alteryx",
          "Palo Alto Networks",
          "Okta",
          "KPMG",
          "CrowdStrike",
          "SAP",
          "Square",
          "NVIDIA",
          "LinkedIn",
          "Snowflake",
          "JetBlue",
          "Booking.com",
          "Tesla",
          "Datadog",
          "Costco",
          "Target",
          "EY",
          "Apple",
          "Adyen",
          "Automation Anywhere",
          "Visa",
          "Expedia",
          "Delta Air Lines",
          "Salesforce",
          "Boeing",
          "American Express",
          "Blue Prism",
          "Uber",
          "McKinsey & Company",
          "Databricks",
          "Oracle",
          "Verizon",
          "Samsung",
          "HCLTech",
          "Amazon Web Services (AWS)",
        ],
      },
    },
  },
};

export const getCompanyDetails = async (
  company: string,
  vertical = COMPANY_TOOL_SCHEMA.inputSchema.properties.vertical.default
) => {
  try {
    const url = `http://localhost:3000/api/company-details`;
    const params = {
      vertical,
      company,
    };

    if (vertical !== "All") {
      params.vertical = vertical;
    }
    params.company = company;

    const result = await axios.get(url, { params });
    console.error("result - ", result.data);
    return result.data; // Assuming the API returns the leads directly in result.data
  } catch (error) {
    console.error("Error fetching company details:", error);
    throw new Error("Failed to retrieve company details.");
  }
};
