import React from 'react'
export const connection =  "ml_accelerator"
export const scratch_schema = "looker_scratch"

export const getChatHistory = async (user,sdk) => {
    const asyncFunction = async (user,sdk) => {
        const slugResponse = await sdk
            .ok(
            sdk.create_sql_query({
                connection_name: connection,
                sql: `SELECT * from ${scratch_schema}.chat_history where user_id=${user} ORDER BY timestamp ASC`,
            })
            )
        const response = await sdk.ok(sdk.run_sql_query(slugResponse.slug, "json"));

        return response
    }
    return asyncFunction(user,sdk);
}

export const updateFeedback = async (id,feedback,sdk) => {
    const asyncFunction = async (id,feedback,sdk) => {
        const slugResponse = await sdk
            .ok(
            sdk.create_sql_query({
                connection_name: connection,
                sql: `UPDATE ${scratch_schema}.chat_history SET feedback='${feedback}' WHERE id='${id}'`,
            })
            )
        const response = await sdk.ok(sdk.run_sql_query(slugResponse.slug, "json"));

        return response
    }
    return asyncFunction(id,feedback,sdk);
}

export const createQuestion = async (id, user, question, answer, sdk) => {
    const asyncFunction = async (id, user, question, answer,sdk) => {
        const slugResponse = await sdk
            .ok(
            sdk.create_sql_query({
                connection_name: connection,
                sql: `INSERT INTO ${scratch_schema}.chat_history (id,user_id,question,answer) VALUES ('${id}',${user},'${question}','${answer}')`,
            })
            )
        const response = await sdk.ok(sdk.run_sql_query(slugResponse.slug, "json"));

        return response
    }
    return asyncFunction(id, user, question, answer,sdk);
}