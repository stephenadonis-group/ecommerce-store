{{- define "novastore.name" -}}
novastore
{{- end }}

{{- define "novastore.labels" -}}
app.kubernetes.io/name: {{ include "novastore.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}