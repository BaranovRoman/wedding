Вроде оптимально
npx gltfjsx public/model/export.gltf -o ./src/components/export-transformed.jsx -t -k -K -d -r -T

Если ругается на буфферы
npx gltfjsx public/model/export.gltf -o ./src/components/export-transformed.jsx -t -k -K -d -r

Создаёт много разметки, но не теряет лепестки
npx gltfjsx public/model/WeddingNew.glb -o ./src/components/WeddingNew.tsx -t -k -K -s -d
