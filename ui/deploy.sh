yarn build --prod

export TARGET_BRANCH=gh-pages
git clone https://github.com/calebhiebert/dd out
cd out
git checkout $TARGET_BRANCH || git checkout --orphan $TARGET_BRANCH
git rm -rf .
cd ..
cp -a dist/ui/. out/.
cp out/index.html out/404.html
mkdir -p out/.circleci && cp -a ../.circleci/. out/.circleci/.
cd out
echo dd.panchem.io > CNAME
git add -A
git commit -m "Automated deployment to GitHub Pages" --allow-empty
git push https://github.com/calebhiebert/dd.git $TARGET_BRANCH -q
rm -rf out && rm -rf dist