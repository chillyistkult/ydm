##################################################################################################################################
# Deployment
# ----------

echo Handling node.js with grunt build deployment.

# 1. Select node version
selectNodeVersion

# 2. Install npm packages
if [ -e "$DEPLOYMENT_SOURCE/package.json" ]; then
  eval $NPM_CMD install
  exitWithMessageOnError "npm failed"
  git submodule foreach "$NPM_CMD" install
fi

# 3. Run grunt to build
if [ -e "$DEPLOYMENT_SOURCE/Gruntfile.js" ]; then
  eval $NPM_CMD install grunt-cli
  exitWithMessageOnError "installing grunt failed"
  ./node_modules/.bin/grunt --no-color build:production
  exitWithMessageOnError "grunt failed"
fi  

# 4. KuduSync
"$KUDU_SYNC_CMD" -v 50 -f "$DEPLOYMENT_SOURCE/dist" -t "$DEPLOYMENT_TARGET" -n "$NEXT_MANIFEST_PATH" -p "$PREVIOUS_MANIFEST_PATH" -i ".git;.hg;.deployment;deploy.sh"
exitWithMessageOnError "Kudu Sync failed"


##################################################################################################################################