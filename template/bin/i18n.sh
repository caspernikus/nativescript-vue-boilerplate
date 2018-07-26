for dir in $(find ./src/locale/* -maxdepth 0 -type d);
do
    msgcat ${dir}/*.po -o ${dir}/merged.po
done

./node_modules/easygettext/src/compile-cli.js --output ./src/locale/locales.json ./src/locale/**/merged.po

rm -r ./src/locale/**/merged.po