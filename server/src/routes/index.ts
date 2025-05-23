import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ message: "Hello" });
});

router.get("/leads", (req, res) => {
  res.json({
    data: [
      {
        company: "Delta Air Lines",
        industry: "Airlines",
        content:
          "Delta Air Lines is proud to unveil a strategic alliance with Amadeus to revolutionize the passenger experience through enhanced data analytics. This partnership integrates Amadeus's cutting-edge AI-powered solutions to predict passenger preferences, optimize flight scheduling, and streamline baggage handling. Leveraging real-time data from over 300 daily flights, Delta aims to reduce delays by 15% and increase customer satisfaction scores by 10% within the next year. The initial rollout will focus on hub airports like Atlanta and Minneapolis, with plans for global expansion in 2025. We anticipate seeing significant improvements in operational efficiency and delighted travelers. More updates soon!",
        hashtags: [
          "#AviationTech",
          "#DataAnalytics",
          "#PassengerExperience",
          "#Airlines",
        ],
      },
      {
        company: "Marriott International",
        industry: "Travel & Hospitality",
        content:
          "Marriott International announces a collaborative pilot program with Certify to enhance its environmental sustainability efforts across select hotel properties. This initiative is designed to accurately measure and reduce our carbon footprint by leveraging Certify's advanced monitoring technology. Initially, the program will be launched in 50 hotels across North America, measuring water usage, energy consumption, and waste generation with the goal of 20% operational improvements in the first year. This data will drive initiatives for waste reduction and sustainable sourcing, and supports our long-term commitment to responsible travel. Stay tuned for reports on the impact!",
        hashtags: [
          "#SustainableHospitality",
          "#ESG",
          "#EnvironmentalImpact",
          "#TravelIndustry",
        ],
      },
      {
        company: "Walmart",
        industry: "Retail & eCommerce",
        content:
          "Walmart is excited to announce the national rollout of our 'Scan & Go' checkout feature, expanding to over 4,000 stores nationwide. Following a successful pilot program with over 500,000 users, we are confident this feature will significantly improve the shopping experience. Customers can now use their smartphones to scan items as they shop, pay within the Walmart app, and skip the traditional checkout lines. We project a 25% reduction in checkout times, enhancing customer convenience and operational efficiency. This launch includes enhanced security measures and dedicated support staff to assist customers. We are committed to creating a seamless shopping experience for everyone. More updates coming soon!",
        hashtags: [
          "#RetailTech",
          "#eCommerce",
          "#CustomerExperience",
          "#Innovation",
        ],
      },
      {
        company: "PayPal",
        industry: "FinTech & Payments",
        content:
          "PayPal proudly announces a strategic investment in Chainlink Labs to drive innovation in decentralized finance (DeFi). This aligns with our vision to enhance the accessibility and security of digital payments. Integrating Chainlink's oracle technology will enable us to securely connect real-world data to blockchain applications, supporting more reliable and transparent transactions. Our commitment is underscored by a $20 million series investment and a joint development project to explore new DeFi use cases. We anticipate this collaboration will reshape the financial landscape, making decentralized services more dependable. Stay tuned for updates as we build the future of finance!",
        hashtags: ["#FinTech", "#DeFi", "#Blockchain", "#DigitalPayments"],
      },
      {
        company: "Palo Alto Networks",
        industry: "Security & Compliance",
        content:
          "Palo Alto Networks has achieved a significant R&D milestone with the successful development of an advanced AI-powered threat detection engine. This engine leverages machine learning algorithms to identify and neutralize sophisticated cyber threats in real time. It integrates with our existing security platform and boasts a 40% improvement in detection accuracy compared to our previous generation, with initial testing reporting a 95% success rate. The new engine also reduces false positives by 25%, streamlining incident response. Early adopters are reporting significant improvements in their overall security posture. We are committed to safeguarding our customers. Stay tuned for the official product launch!",
        hashtags: ["#CyberSecurity", "#AI", "#ThreatDetection", "#Innovation"],
      },
      {
        company: "Amazon Web Services (AWS)",
        industry: "Cloud Enablement & DevOps",
        content:
          "AWS is excited to announce the launch of a new suite of DevOps tools designed to streamline application deployment, accelerate feedback loops, and enhance collaboration. This integrated toolchain comprises enhanced CI/CD pipelines, automated infrastructure provisioning, and advanced monitoring capabilities. Customers can expect a 30% reduction in deployment times and a 20% decrease in infrastructure costs. We are partnering with industry leaders to provide seamless integration with existing DevOps environments. This release underscores our commitment to empowering developers and accelerating innovation. More updates to follow on new features!",
        hashtags: ["#CloudComputing", "#DevOps", "#AWS", "#Automation"],
      },
      {
        company: "Google",
        industry: "Data Engineering & AI Readiness",
        content:
          "Google is expanding its scope of work with the release of a new data engineering platform designed to simplify the creation of AI-ready datasets. This platform offers automated data ingestion, cleaning, and transformation capabilities, reducing the manual effort required for data preparation by up to 50%. It integrates seamlessly with Google Cloud AI services like Vertex AI, allowing users to quickly train and deploy machine learning models. We are providing comprehensive training resources to help data scientists and engineers leverage the full potential of this platform. We are committed to accelerating the adoption of AI across industries. Stay tuned!",
        hashtags: [
          "#DataEngineering",
          "#ArtificialIntelligence",
          "#GoogleCloud",
          "#BigData",
        ],
      },
      {
        company: "Microsoft",
        industry: "Gen AI & Intelligent Automation",
        content:
          "Microsoft announces a joint venture with OpenAI to further advance the state of Generative AI technologies, specifically incorporating GenAI into our existing intelligent automation platform. This initiative will focus on developing cutting-edge AI models capable of automating complex business processes. The target is to reduce task execution times by 40% in roles such as Claims Processing and HR Onboarding. Our combined expertise will accelerate the development of AI solutions that empower businesses to achieve new levels of efficiency. We anticipate launching several innovative products in the next year. More to come!",
        hashtags: [
          "#GenAI",
          "#IntelligentAutomation",
          "#Microsoft",
          "#ArtificialIntelligence",
        ],
      },
      {
        company: "IBM",
        industry: "App Modernisation & Product Engineering",
        content:
          "IBM is proud to announce a new partnership with Red Hat to deliver enterprise-grade app modernization services. This collaboration combines IBM's deep industry expertise with Red Hat's leading open-source technologies, especially focusing on their OpenShift container platform. We will provide comprehensive solutions for modernizing legacy applications, reducing costs, and improving agility. The goal is to empower enterprises to accelerate their digital transformation journeys via simplified app modernization. Initial engagements are already underway with several Fortune 500 companies. Look for significant advancements as modernization becomes more accessible!",
        hashtags: ["#AppModernisation", "#CloudNative", "#IBM", "#RedHat"],
      },
      {
        company: "Hilton",
        industry: "Travel & Hospitality",
        content:
          "Hilton is investing in a new technology launch called 'Digital Concierge,' which uses AI to provide personalized guest experiences. This new system is being rolled out to select properties. The system provides individualized recommendations, real-time support through channels like mobile apps and text messages, and streamlined booking capabilities. The expected impact of Digital Concierge spans improving guest satisfaction scores by 15% and boosting mobile app usage by 25%. We are excited to improve our guests’ experiences. Stay up-to-date as updates as the rollout continues!",
        hashtags: [
          "#TravelTech",
          "#PersonalizedExperiences",
          "#Hospitality",
          "#AIConcierge",
        ],
      },
      {
        company: "United Airlines",
        industry: "Airlines",
        content:
          "United Airlines is excited to announce a pilot-to-production transition with its 'Eco-Skies' sustainability program. After a successful pilot that saw a 10% reduction in carbon emissions on select routes, we are now expanding Eco-Skies to all domestic flights. This initiative includes using sustainable aviation fuels (SAF), implementing more efficient flight routing, and reducing single-use plastics on board. We expect to see a 15% reduction in overall carbon footprint by 2025 as a result. United is truly committed to environmental responsibility and the advancement of sustainable air travel. We will continue expanding Eco-Skies with new elements.",
        hashtags: ["#SustainableAviation", "#Airlines", "#EcoFriendly", "#SAF"],
      },
      {
        company: "Target",
        industry: "Retail & eCommerce",
        content:
          "Target announces a new regional rollout of its same-day delivery service, 'Shipt,' expanding to major metropolitan areas in the Southeast US. Currently operating in over 250 cities, Shipt provides on-demand delivery of groceries, household essentials, and more. Based on customer engagement and sales analytics, the goal is to enhance accessibility and convenience for millions of shoppers. The expanded service integrates seamlessly with the Target app and website, enabling easy browsing and ordering. Early forecasts suggest a 20% increase in online sales attributed to Shipt. Stay tuned for more expansion announcements!",
        hashtags: ["#eCommerce", "#RetailTech", "#SameDayDelivery", "#Shipt"],
      },
      {
        company: "Visa",
        industry: "FinTech & Payments",
        content:
          "Visa is proud to announce a new R&D milestone in developing advanced fraud detection algorithms. The newly developed system uses machine learning to analyze transaction data in real time, with a detection rate over 90% in tests. The improved detection rate comes with a 30% reduction in false positives, improving customer experiences. The goal is to reduce losses related to fraudulent payment activity by 20% over the next year. With increased protection for merchants and consumers, Visa continues to spearhead innovation in the world of secure payments. We’ll keep you posted on improvements!",
        hashtags: [
          "#FinTech",
          "#FraudDetection",
          "#Payments",
          "#ArtificialIntelligence",
        ],
      },
      {
        company: "CrowdStrike",
        industry: "Security & Compliance",
        content:
          "CrowdStrike announces a significant Series C investment in Darktrace, a leading AI cybersecurity firm. The investment will drive joint research and development initiatives focused on enhancing threat detection capabilities, resulting in tighter security measures. Specifically, the funds will support the development of AI-powered solutions that automate threat hunting and incident response. Over the next two years, we expect to see tangible improvements in threat detection accuracy, with a goal of identifying and neutralizing advanced threats 50% faster. Our collaboration will give our customers greater peace of mind. Stay tuned!",
        hashtags: [
          "#CyberSecurity",
          "#ArtificialIntelligence",
          "#ThreatHunting",
          "#Investment",
        ],
      },
      {
        company: "ServiceNow",
        industry: "Cloud Enablement & DevOps",
        content:
          "ServiceNow announces a new joint venture with Accenture to accelerate digital transformation for enterprises. This venture integrates ServiceNow's platform with Accenture's consulting expertise. The focus will be on streamlining IT operations, improving employee experiences, and driving innovation across industries like healthcare, finance, and manufacturing. Initial projects will involve implementing ServiceNow solutions for cloud migration, automation, and cybersecurity. The venture projects achieving a 40% increase in operational efficiency for clients within the first year. The collaboration promises to be a real game-changer. More updates soon!",
        hashtags: [
          "#DigitalTransformation",
          "#CloudComputing",
          "#ServiceNow",
          "#Accenture",
        ],
      },
      {
        company: "Databricks",
        industry: "Data Engineering & AI Readiness",
        content:
          "Databricks announces a major technology launch: 'Delta Lake 3.0,' an enhanced version of its open-source storage layer for data lakes. Delta Lake 3.0 introduces real-time data streaming capabilities, improved performance for large-scale data processing, and enhanced security features via role-based access control. This upgrade simplifies data engineering workflows, reducing development time by 30%. Delta Lake 3.0 natively integrates with popular data processing frameworks such as Apache Spark and Apache Flink. We aim to provide organizations with a unified platform for data science and machine learning. We will continue to innovate!",
        hashtags: ["#DataEngineering", "#DataLake", "#BigData", "#ApacheSpark"],
      },
      {
        company: "UiPath",
        industry: "Gen AI & Intelligent Automation",
        content:
          "UiPath unveils a new scope-of-work expansion with a focus on integrating generative AI (GenAI) capabilities into its Robotic Process Automation (RPA) platform. This expansion will enable robots to automate complex tasks that previously required human intervention, such as understanding unstructured data and making context-aware decisions. This will lead to a 50% reduction in manual processing time for processes like invoice management and customer service inquiries. By infusing RPA with GenAI, UiPath will empower businesses to achieve unprecedented levels of automation and efficiency. Stay tuned for product enhancements!",
        hashtags: ["#RPA", "#GenAI", "#IntelligentAutomation", "#Innovation"],
      },
      {
        company: "Accenture",
        industry: "App Modernisation & Product Engineering",
        content:
          "Accenture announces a significant R&D milestone in developing a new microservices architecture framework for enterprise applications. The framework, designed to accelerate app modernization initiatives, supports polyglot programming and promotes modularity with the goal of increasing developer productivity by 40%. Clients can transform legacy applications into cloud-native solutions with reduced risk. The framework is fully compliant with industry best practices, providing a secure and reliable platform for modernizing enterprise applications. We're dedicated to building next-generation digital solutions. More to come!",
        hashtags: [
          "#AppModernisation",
          "#Microservices",
          "#CloudNative",
          "#Innovation",
        ],
      },
      {
        company: "Hyatt",
        industry: "Travel & Hospitality",
        content:
          "Hyatt Hotels Corporation rolls out a new 'Contactless Check-In' feature across its global portfolio. This enhancement aims to streamline the arrival process, giving guests full control over their hotel experience. The new system provides automated room assignments, digital keys, and personalized welcome messages via the Hyatt mobile app. Early results suggest the solution has shortened wait times, and the goal is to elevate guest satisfaction by 15%. As our guests’ expectations evolve, we strive to meet their preferences. Stay tuned for updates as features and capabilities grow!",
        hashtags: [
          "#TravelTech",
          "#Hospitality",
          "#CustomerExperience",
          "#Contactless",
        ],
      },
      {
        company: "Southwest Airlines",
        industry: "Airlines",
        content:
          "Southwest Airlines announces a pilot program to test new fuel-efficient aircraft. Southwest is partnering with Boeing to trial the airline's updated 737-MAX aircraft on popular, high-traffic routes. The new aircraft boast an estimated 20% improvement in fuel efficiency and reduced carbon emissions. The evaluation phase will last six months, and the results will inform long-term fleet modernization decisions. The plan is to continue reducing our footprint, and our long term goal is sustainability. Updates to follow soon!",
        hashtags: [
          "#FuelEfficiency",
          "#Sustainability",
          "#AviationTech",
          "#Boeing",
        ],
      },
      {
        company: "Best Buy",
        industry: "Retail & eCommerce",
        content:
          "Best Buy announces a new partnership with Instacart to expand its same-day delivery services nationwide, allowing customers to order a wide range of electronics, appliances, and accessories online and have them delivered to their doorsteps within hours. The integration with Instacart's platform provides access to millions of shoppers and aims to increase online sales by 20% with enhanced convenience which also promotes local community support. With dedicated customer support through the Instacart platform, customers can expect a seamless and efficient delivery experience. More to come!",
        hashtags: [
          "#SameDayDelivery",
          "#eCommerce",
          "#RetailTech",
          "#Instacart",
        ],
      },
      {
        company: "Mastercard",
        industry: "FinTech & Payments",
        content:
          "Mastercard announces a strategic alliance with Stripe to simplify online payment processing for small businesses. With streamlined onboarding and integrated security features, new business owners can reduce overhead and boost payment success rates. This partnership reduces the barrier to entry to online commerce. The collaboration will boost the integration of Mastercard's secure payment technologies with Stripe's developer-friendly platform. The goal is to empower small businesses with the tools needed to thrive in the digital economy. Updates incoming!",
        hashtags: ["#FinTech", "#OnlinePayments", "#SmallBusiness", "#Stripe"],
      },
      {
        company: "Okta",
        industry: "Security & Compliance",
        content:
          "Okta announces a major technology launch: 'Adaptive MFA 2.0,' its next-generation multi-factor authentication solution. It leverages machine learning to automatically adjust authentication requirements based on user behavior and risk profiles. IT expects to reduce friction for legitimate users while strengthening security against cyber threats. This improvement results in a 40% reduction in false positives. This offering streamlines identity and access management and integrates seamlessly with existing Okta deployments. Together, we're building a secure digital future!",
        hashtags: ["#CyberSecurity", "#MFA", "#IdentityManagement", "#Okta"],
      },
      {
        company: "Oracle",
        industry: "Cloud Enablement & DevOps",
        content:
          "Oracle announces a new regional rollout of its cloud infrastructure services, expanding its data center presence to Southeast Asia. This expansion will provide local businesses with access to low-latency cloud resources, enabling them to develop and deploy applications faster. It aims to reduce data residency challenges and support regional compliance requirements. Businesses can migrate to the cloud with confidence with enhanced security and performance. Updates to follow frequently!",
        hashtags: [
          "#CloudComputing",
          "#DataCenter",
          "#Infrastructure",
          "#Oracle",
        ],
      },
      {
        company: "Snowflake",
        industry: "Data Engineering & AI Readiness",
        content:
          "Snowflake announces a new partnership with DataRobot to accelerate AI adoption for enterprises. The partnership will simplify the process of building, deploying, and managing machine learning models on Snowflake's data cloud. Customers use the seamless integration to accelerate their data science initiatives. Early forecasts point to a 30% faster model development lifecycle. Updates to follow soon!",
        hashtags: [
          "#DataScience",
          "#MachineLearning",
          "#DataCloud",
          "#Snowflake",
        ],
      },
      {
        company: "Automation Anywhere",
        industry: "Gen AI & Intelligent Automation",
        content:
          "Automation Anywhere announces a significant series C investment into a new AI assistant, combining Robotic Process Automation (RPA) with AI for use across all functional departments such as HR, finance, and customer service. The new RPA and AI combination is projected to save companies up to 40% more money than traditional RPA alone. The platform anticipates reducing errors in tasks and improving customer satisfaction by 20% within the first year. We look forward to the future of process automation.",
        hashtags: ["#Automation", "#GenAI", "#RPA", "#Investment"],
      },
      {
        company: "Thoughtworks",
        industry: "App Modernisation & Product Engineering",
        content:
          "Thoughtworks announces a pilot-to-production transition of its 'Legacy Code Transformation' program that is specifically designed to migrate legacy applications into microservice-based solutions. After a successful series of pilot projects that resulted in a 50% reduction in maintenance costs and a 30% increase in application performance, Thoughtworks is rolling out the program globally. Thoughtworks' program focuses on modularity and independent deployment. We look forward to increased successes as the program rolls out.",
        hashtags: [
          "#LegacyCode",
          "#Microservices",
          "#CloudNative",
          "#TechTransformation",
        ],
      },
      {
        company: "InterContinental Hotels Group (IHG)",
        industry: "Travel & Hospitality",
        content:
          "InterContinental Hotels Group(IHG) unveils a new technology launch: 'Personalized Stay,' a program designed to analyze customer preferences. It uses AI to create customized hotel experiences catered to each guest. The AI will analyze booking history, reward program data, and survey results to estimate guest profiles. Benefits for guests include customized hotel rooms, curated lists, and personalized offers. Personalized Stay aims to lift guest satisfaction, while increasing spending. More updates to come as the program evolves!",
        hashtags: [
          "#PersonalizedExperience",
          "#AI",
          "#HospitalityTech",
          "#GuestSatisfaction",
        ],
      },
      {
        company: "Hawaiian Airlines",
        industry: "Airlines",
        content:
          "Hawaiian Airlines announces a scope-of-work expansion, which specifically focuses on incorporating new sustainability efforts into long-haul flights. These changes include more efficient flight-planning, waste streamlining, and new lighter materials inside of the cabin. By 2026, Hawaiian Airlines expects their Scope-Of-Work expansion efforts and changes to reduce fuel burn rates, which will create a ripple effect that ends up slashing carbon emissions by 10%. Hawaiian Airlines aims to be the leader in eco-friendly pacific travel.",
        hashtags: [
          "#SustainabilityTravel",
          "#AviationTravel",
          "#EcoFriendly",
          "#PacificTravel",
        ],
      },
      {
        company: "Kroger",
        industry: "Retail & eCommerce",
        content:
          "Kroger announces a regional rollout of its new 'Scan, Bag, Go' technology that increases efficiency in high demand stores. The new technology will use proprietary image scanning systems combined with AI to reduce checkout wait times by up to 50%. It will assist customers with automated bagging, payment options, and real-time savings and rewards options as they shop. Kroger projects that the Scan, Bag, Go technology will increase customer satisfaction by 20% in the first year of operation. More is planned for the future.",
        hashtags: [
          "#ShoppingTech",
          "#GroceryShopping",
          "#AIScanSystems",
          "#RetailTech",
        ],
      },
      {
        company: "Block (formerly Square)",
        industry: "FinTech & Payments",
        content:
          "Block announces a joint venture for advanced Point of Sale technology with Ingenico, a leader in innovative payment technology. Block’s Point of Sale (POS) system integrated within Ingenico’s industry-leading hardware is set to cut overhead and create a more simplified and seamless experience within restaurants, retail, and service-based businesses. The venture will give Block’s point of sales technology integration to millions of businesses across the globe. The goal is for these changes to expand payment options, streamline inventory and staffing data, and increase revenue by 20%.",
        hashtags: [
          "#POSSystems",
          "#FinancialTech",
          "#PaymentInnovation",
          "#Ingenico",
        ],
      },
      {
        company: "Check Point",
        industry: "Security & Compliance",
        content:
          "Check Point achieves a significant R&D milestone in the development of advanced threat prevention technology, branded as 'Deep Scan AI Threat Prevention'. Check Point’s new Deep Scan system leverages AI to stop sophisticated malware attacks and zero-day threats. The new scanning system has a potential to reduce data breaches by up to 40%. With Deep Scan AI, businesses will be able to significantly reduce risk, and focus on growth. Check Point is at the forefront of cybersecurity safety protocols.",
        hashtags: [
          "#CybersecuritySolutions",
          "#DataBreachDefence",
          "#AITesting",
          "#CheckPoint",
        ],
      },
      {
        company: "Digital Ocean",
        industry: "Cloud Enablement & DevOps",
        content:
          "Digital Ocean announces a new series investment into proprietary cloud orchestration middleware. Designed for businesses running workloads on both AWS, Azure, Google Cloud, and Digital ocean; the new middleware system makes for a simple cloud experience. Businesses can expect an estimated 35-45% reduction of operational expenses, as well as increased automation that will lead towards time savings that Digital Ocean projects as substantial. As always, Digital Ocean strives to be the industry leader for cloud infrastructure.",
        hashtags: [
          "#CloudComputing",
          "#MiddlewareSolutions",
          "#AutomationSolutions",
          "#DigitalOcean",
        ],
      },
      {
        company: "Cloudera",
        industry: "Data Engineering & AI Readiness",
        content:
          "Cloudera announces a new technology launch called “Universal Data Platform”, designed to accelerate organizations’ AI readiness with its new data processing technology. Cloudera’s Universal Data Platform will streamline the deployment of AI models by integrating enterprise-grade data governance and security measures with cutting-edge data processing power. Projected to bring efficiency for deploying AI tools is anticipated to increase business success, and revenues by 25-30% by Cloudera. Early testing proves the new platform may be the future of AI.",
        hashtags: ["#DataProcessing", "#AI", "#Cloudera", "#DataManagement"],
      },
      {
        company: "Blue Prism",
        industry: "Gen AI & Intelligent Automation",
        content:
          "Blue Prism announces a new upgrade of its Digital Workforce platform with generative AI capabilities, which is set to expand process automation capabilities to over 75 functional departments. The upgrade will give robots the capability of learning and automating unstructured data and improving process insights. Blue Prism projects that these new capabilities will increase automatable workflow by 40%. Blue Prism’s vision for the future is that every business is able to have digital assistants to increase performance and morale.",
        hashtags: [
          "#BluePrism",
          "#ProcessAutomation",
          "#WorkforcePlatform",
          "#GenerativeAI",
        ],
      },
      {
        company: "Globant",
        industry: "App Modernisation & Product Engineering",
        content:
          "Globant announces the unveiling of their “Application Modernization Accelerator” that will assist legacy applications to modernize so they can scale. Globant’s Application Modernization Accelerator has pre-built components and tools that can be seamlessly integrated into almost any system and infrastructure, which improves app performance. With Globant’s modernization accelerator, developers estimate a boost to total productivity. The program is projected to have a 20-30% boost in development timeline, which will result in faster time to market and more revenues.",
        hashtags: [
          "#TechProducts",
          "#Scalability",
          "#LegacyTransformation",
          "#AppTeams",
        ],
      },
      {
        company: "Four Seasons",
        industry: "Travel & Hospitality",
        content:
          "Four Seasons Hotels and Resorts announces a pilot program using blockchain technology, designed to enhance the personalized experience delivered to their clients. The pilot program will give Four Season customers enhanced capabilities such as a secure portal for booking confirmations, reward points, and personalized service requests. Blockchain technology's reliability will give both Four Seasons and its loyal customer base enhanced peace-of-mind when handling sensitive information, especially as it relates to billing and legal matters. Four Seasons aims to be the industry leader for high-end travel accommodations.",
        hashtags: [
          "#FourSeasonsResorts",
          "#Blockchain",
          "#SecuredLedgerSystem",
          "#HighEndTravelIndustry",
        ],
      },
      {
        company: "JetBlue",
        industry: "Airlines",
        content:
          "JetBlue announces a new technology launch set to improve the fuel management systems for its fleet, a move expected to make the company more financially and environmentally efficient. The enhancements will be data-driven and use sensors and telemetry to refine flight plans, which is expected to reduce jet fuel waste and slash its carbon footprint by 10%. The fuel consumption data is expected to improve pilot decision-making. With the technology refinements, JetBlue is committing to future innovation!",
        hashtags: [
          "#FuelTech",
          "#FlightTelemetry",
          "#JetBlue",
          "#SustainableTravelIndustry",
        ],
      },
      {
        company: "Costco",
        industry: "Retail & eCommerce",
        content:
          "Costco announces a scope-of-work expansion with a primary focus on creating more 'Eco-Conscious Warehouses' using new building material and improving building infrastructure. The building material and infrastructure changes are expected to reduce the building energy usage by 25-30%, improving the financial stability, brand image, and long-term sustainability. The Eco-Conscious Warehouses make the Costco brand more appealing to customers and investors. Look for more from Costco's Eco-Conscious expansion!",
        hashtags: [
          "#Costco",
          "#SustainableRetailIndustry",
          "#EcoConsciousBuildings",
          "#CleanEnergy",
        ],
      },
      {
        company: "Adyen",
        industry: "FinTech & Payments",
        content:
          "Adyen announces a new partnership with Klarna to improve Buy Now, Pay Later (BNPL) payment options for retailers using the network. With growing customer demand for more BNPL systems, Adyen expects that Klarna and Adyen working together will improve sales revenue, boost customer adoption rates, and streamline payment options for over 1 million retailers. The partnership is projected to increase customer satisfaction and retention for retailers by 40%. With future growth and adoption, we look for big things with Adyen and Klarna.",
        hashtags: ["#Adyen", "#Klarna", "#BuyNowPayLater", "#PaymentsNetwork"],
      },
    ],
  });
});

export default router;
