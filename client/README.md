Comment out file, uncomment url

application: schedule-app {
  label: "Schedule App"
  url: "http://localhost:8080/bundle.js"
 # file: "vonage/bundle.js"
  entitlements: {
    local_storage: yes
    use_embeds: yes
    use_iframes: yes
    core_api_methods: ["all_connections", "search_folders", "run_query", "me", "dashboard", "lookml_model_explore", "create_query",
      "query_for_slug", "create_sql_query", "run_sql_query", "run_inline_query", "all_scheduled_plans", "update_scheduled_plan", "scheduled_plan"]
    use_form_submit: yes
    external_api_urls : ["http://localhost:8080","https://localhost:8080"]

  }
}


Make sure you use node version 16

nvm use 16.20.2

Then you can run yarn dev

Put in your browser

http://localhost:8080/bundle.js



Then put in the path of your app in a different tab and open the app. This is now running locally.

Note*  You will have to refresh the page every time you want to see a change.

Once you are done, run yarn run build

Take the bundle file in dist folder and drag it over to the manifest file (do not copy and paste)


Change the path in manifest file back to file and not url

  #url: "http://localhost:8080/bundle.js"
   file: "bundle.js"
