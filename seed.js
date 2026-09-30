const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Create a workspace
  const workspace = await prisma.workspace.create({
    data: {
      name: "Acme Corp",
    }
  });

  console.log(`Created workspace: ${workspace.name}`);

  // Create prospects
  const prospectsData = [
    { companyName: "Addis Bistro", industry: "Restaurant", location: "Addis Ababa", icpScore: 92, status: "NEW" },
    { companyName: "Blue Nile Cafe", industry: "Cafe", location: "Addis Ababa", icpScore: 85, status: "CONTACTED" },
    { companyName: "Habesha Kitchen", industry: "Restaurant", location: "Bole", icpScore: 78, status: "REPLIED" },
    { companyName: "Urban Roast", industry: "Cafe", location: "Kazanchis", icpScore: 95, status: "NEW" },
    { companyName: "Tomoca Coffee", industry: "Cafe", location: "Piassa", icpScore: 88, status: "INTERESTED" },
  ];

  for (const p of prospectsData) {
    await prisma.prospect.create({
      data: {
        ...p,
        workspaceId: workspace.id,
      }
    });
  }

  console.log("Created mock prospects.");
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
