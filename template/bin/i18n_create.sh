./node_modules/easygettext/src/extract-cli.js --output ./src/locale/mobile.pot ./src/components/*.vue;

for dir in $(find ./src/locale/* -maxdepth 0 -type d);
do
    if [[ -e ${dir}/mobile.po ]]; then

        msgmerge ${dir}/mobile.po ./src/locale/mobile.pot --update;
        msgfmt --output-file=${dir}/mobile.mo ${dir}/mobile.po
    else
        msginit -i ./src/locale/mobile.pot -o ${dir}/mobile.po --locale=${dir##*/} --no-translator;
    fi
done