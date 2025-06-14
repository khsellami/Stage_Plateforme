document.getElementById("cv-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const file = document.getElementById("cv-file").files[0];

  if (file && file.type === "application/pdf") {
    const reader = new FileReader();
    reader.onload = function () {
      const typedarray = new Uint8Array(this.result);

      pdfjsLib.getDocument(typedarray).promise.then(function (pdf) {
        let textPromises = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          textPromises.push(
            pdf.getPage(i).then(page =>
              page.getTextContent().then(textContent => {
                return textContent.items.map(item => item.str).join(" ");
              })
            )
          );
        }

        Promise.all(textPromises).then(pagesText => {
          const cvText = pagesText.join(" ").toLowerCase();

          const offres = [
            {
              title: "Data Scientist Junior",
              description: "python machine learning analyse données pandas sklearn deep learning"
            },
            {
              title: "Développeur Web",
              description: "javascript html css react développement front-end"
            },
            {
              title: "Ingénieur DevOps",
              description: "docker kubernetes ci/cd cloud linux devops"
            }
          ];

          const cleanedCV = cvText.replace(/[^\w\s]/gi, '').split(/\s+/);

          let bestScore = 0;
          let bestMatch = "";

          offres.forEach(offre => {
            const motsOffre = offre.description.toLowerCase().split(" ");
            const motsCommuns = motsOffre.filter(mot => cleanedCV.includes(mot));
            const score = motsCommuns.length / motsOffre.length;

            if (score > bestScore) {
              bestScore = score;
              bestMatch = offre.title;
            }
          });

          const scoreFinal = bestScore.toFixed(2);
          document.getElementById("score").textContent =
            `Score de similarité : ${scoreFinal} avec l'offre "${bestMatch}"`;
        });
      });
    };

    reader.readAsArrayBuffer(file);
  } else {
    document.getElementById("score").textContent = "Veuillez importer un fichier PDF valide.";
  }
});
