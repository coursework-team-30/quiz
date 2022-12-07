git filter-branch --env-filter 'if [ "$GIT_AUTHOR_EMAIL" = "seikhirfan2011@gmail.com" ]; then
GIT_AUTHOR_NAME="Irfan"
GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"; fi' -- --all'