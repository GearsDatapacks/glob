rm -rf build
mkdir build
tsc -b
rsync -av src/ build --exclude="*.ts"
rm -rf src/*.js
rm -rf src/**/*.js