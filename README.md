# LifeMosaic

## Hosted Link
[Click here to access the web app](http://34.227.80.231:8080/)

## Demo Video
[Watch the demo here](https://youtu.be/E6KA0_gnDHU)

## Documentation
[Read the full documentation](https://docs.google.com/document/d/1rqWor3jHVr1iwcrV1MqIWWe9rQd8L_qzTcPTTVKruMQ/edit?usp=sharing)

---

## Project Overview

LifeMosaic is a web application designed to help users **set goals, track progress, and stay motivated** by visualizing their personal and professional growth. It allows users to see their journey, celebrate accomplishments, and build a structured path toward self-improvement.

### Why I Built This Project
Many people struggle with motivation and tracking their goals. LifeMosaic was created to provide a structured platform where users can visualize their progress, set meaningful milestones, and stay engaged. My goal was to combine technology with personal growth to make goal-setting more interactive and rewarding.

## Tech Stack

**Frontend**: Next.js (React 19, TypeScript, Tailwind CSS)  
**Backend**: Next.js API Routes (Server-side functions using Node.js)  
**Database**: MySQL (Hosted on DigitalOcean)  
**Deployment**: Docker, AWS ECS Fargate  
**APIs Used**: NASA APOD API, Ninja Quotes API  

---

## Technical Obstacles

### Docker Image Challenges
I faced multiple challenges while creating a Docker image for the application. Initially, the build process was failing due to an incompatible Node.js version in the Dockerfile. Updating the Node.js version resolved the issue.  
Another challenge arose with **date-fns**, which was not compatible with React 19. This caused build errors, requiring me to find a version that worked correctly with my Next.js setup.

### API Key Management and Security
Initially, API keys for the **NASA APOD API** and **Ninja Quotes API** were exposed in the frontend. To secure them, I moved API calls to server-side routes (`app/api/nasa/route.ts` and `app/api/quotes/route.ts`), ensuring sensitive keys were not exposed.

---

## Obstacles

### Service Limitations and Costs
- **DigitalOcean Database Free Plan Limits**: The free plan for DigitalOcean's managed MySQL database has limitations on storage and connections, which may become an issue as the user base grows.
- **Ninja Quotes API Limitations**: The free-tier of the Ninja Quotes API has a daily request limit, which could cause outages if exceeded.
- **AWS Deployment Costs**: While AWS ECS Fargate provides a serverless hosting solution, its costs can be unpredictable, requiring careful monitoring for long-term sustainability.

---

## Things I Learned

- **Developing a Scalable Web App**: Hands-on experience with Next.js and TypeScript improved my understanding of type safety, code reusability, and dynamic UI development.
- **Docker and Cloud Deployment**: Containerizing an application with Docker and deploying it using AWS ECS Fargate ensured scalability and simplified maintenance.
- **Database Management with DigitalOcean**: Setting up and optimizing MySQL on DigitalOcean helped me understand database hosting, connection pooling, and scaling strategies.
- **API Security Best Practices**: Moving API requests to server-side routes reinforced the importance of securing API keys and managing authentication properly.
- **Troubleshooting and Debugging**: I improved my debugging skills, solving React 19 dependency conflicts, AWS environment variable issues, and deployment failures caused by Node.js version mismatches.
- **Cost Management in Cloud Services**: Monitoring AWS and DigitalOcean costs helped me optimize resources and minimize unnecessary spending to maintain an efficient, budget-friendly deployment strategy.

---

## Easter Egg
There is a **hidden button** throughout the web app, which is an Easter egg that I will reveal soon. See if you can find it!

---

If you find any bugs or have feedback, message me on **LinkedIn** or email me at **sbaek19@my.bcit.ca**.

#LifeMosaic #WebDevelopment #NextJS #AWS #Docker #TechProject #SelfImprovement
