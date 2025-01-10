from flask import Blueprint, jsonify, request
import requests, os, uuid, json
from app.forms import TranslatorForm

translate_routes = Blueprint('translate', __name__)

@translate_routes.route('/', methods=['POST'])
def translate():
    form = TranslatorForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    original_text = form.data['text']

    def target_language(language):
        if language == 'Spanish':
            return 'es'
        elif language == 'Portuguese':
            return 'pt'
        elif language == 'Italian':
            return 'it'
        elif language == 'English':
            return 'en'
        elif language == 'French':
            return 'fr'
        elif language == 'Japanese':
            return 'ja'

    key = '6pb8xwH6yY7dcO14BEi1neJHDugV4yukp2sNoW2Lx4AGEjji2XMvJQQJ99BAACYeBjFXJ3w3AAAbACOGeRCB'
    endpoint = 'https://api.cognitive.microsofttranslator.com/'
    path = '/translate'
    location = 'eastus'
    constructed_url = endpoint + path
    params = {
    'api-version': '3.0',
    'from': 'en',
    'to': target_language(form.data['language'])
    }
    headers = {
    'Ocp-Apim-Subscription-Key': key,
    'Ocp-Apim-Subscription-Region': location,
    'Content-type': 'application/json',
    'X-ClientTraceId': str(uuid.uuid4())
    }
    body = [{ 'text': original_text }]
    translator_request = requests.post(constructed_url, params=params, headers=headers, json=body)
    translator_response = translator_request.json()
    translated_text = translator_response[0]['translations'][0]['text']
    # return json.dumps(translator_response, sort_keys=True, ensure_ascii=False, indent=4, separators=(',', ': '))
    return translated_text